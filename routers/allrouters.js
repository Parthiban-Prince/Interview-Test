import express from 'express';
import { createPaste,getPasteById,getPasteByIds } from '../service/logic.js';

const router = express.Router();


router.get('/healthz',(req,res)=>{
    res.status(200).json({ok: 'true'});
})


router.post('/pastes',createPaste);

router.get('/pastes/:id',getPasteById);

router.get('/p/:id',getPasteByIds);


export default router;