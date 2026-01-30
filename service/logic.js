import Paste from "../schema/pasteschema.js";
import time from '../utils/time.js';
import esc from '../utils/htmlescape.js';


export async function  createPaste(req,res) {


    try{


    const {content, ttl_seconds, max_views} = req.body;

    if(!content || typeof content !== 'string'){
        return res.status(400).json({error: 'Invalid content'});
    }
    if(!ttl_seconds || typeof ttl_seconds < 1){
        return res.status(400).json({error: 'Invalid ttl_seconds'});
    }

    if(!max_views || typeof max_views < 1){
        return res.status(400).json({error: 'Invalid max_views'});
    }
    const expiresAt = new Date(Date.now() + ttl_seconds * 1000);
    
    const paste = new Paste({
        content,
        ttl_seconds,
        max_views,
        expiresAt,
        views: 0
    });
    await paste.save();

    const url  = `https://interview-test-kohl.vercel.app/api/p/${paste._id}`
    
    return res.status(201).json({id: paste._id, url});


    }catch(err){
        return res.status(500).json({error: 'Internal Server Error'});
    }

}

export async function getPasteById(req,res) {

    const id = req.params.id;
    console.log("Fetching paste with id:", id);

    if(!id){
        return res.status(400).json({error: 'Invalid id'});
    }

    const paste = await Paste.findById(id);
    if(!paste){
        return res.status(404).json({error: 'Paste not found'});
    }
    
    const now = time(req)

    if(paste.expiresAt && paste.expiresAt < now){
        return res.status(410).json({error: 'Paste has expired'});
    }
    if(paste.max_views >= paste.max_views){
        return res.status(410).json({error: 'Paste has reached maximum views'});
    }

    paste.views += 1;
    await paste.save();

    return res.status(200).json({
        content: paste.content,
        remaining_views: paste.max_views ? paste.max_views - paste.views : null,
        expires_at: paste.expiresAt ? new Date(paste.expiresAt).toISOString() : null    
    });

}


export async function getPasteByIds(req,res) {

    const id = req.params.id;
    if(!id){
        return res.status(400).json({error: 'Invalid id'});
    }

    const paste = await Paste.findById(id);
    if(!paste){
        return res.status(404).json({error: 'Paste not found'});
    }
    const now = time(req)
    if(paste.expiresAt && paste.expiresAt < now){
        return res.status(410).json({error: 'Paste has expired'});
    }
    if(paste.max_views >= paste.max_views){
        return res.status(410).json({error: 'Paste has reached maximum views'});
    }
    paste.views += 1;
    await paste.save();
    return res.status(200).send(
        `<html>
        <head><title>Paste</title></head>
        <body>
        <pre>${esc(paste.content)}</pre>
        </body>
        </html>`
    );

}



export default { createPaste,
    getPasteById,
    getPasteByIds
}
