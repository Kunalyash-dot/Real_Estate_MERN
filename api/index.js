import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connect to MongoDB")
}).catch((error)=>{
    console.log(`Not connected Error ${error}`)
})


app.listen(3000,()=>{
    console.log("Server runing at port 3000!")
})