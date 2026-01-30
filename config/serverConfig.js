import doenv from 'dotenv';
import mongoose from 'mongoose';

doenv.config();

const Port  = process.env.PORT || 8080;

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/pastebin_clone";
mongoose.connect(MONGODB_URL).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log('Error connecting to MongoDB', err);
});

export { Port, MONGODB_URL };