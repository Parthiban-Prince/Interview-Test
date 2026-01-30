import express from 'express';
import {Port,MONGODB_URL} from './config/serverConfig.js';
import router from './routers/allrouters.js';

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api',router)

app.listen(Port, ()=>{
    MONGODB_URL
    console.log(`Server is running on port ${Port}`);
})

