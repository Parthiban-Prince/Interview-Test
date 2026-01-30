export default function time(req,res,next){

    if(process.env.NODE_ENV ===  "1" ){
        const header = req.headers[x-test-now-ms];
        if(header) return Number(header);
    }
    return Date.now();
}