import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connect to MongoDB")
}).catch((error)=>{
    console.log(`Not connected Error ${error}`)
})



app.listen(3000,()=>{
    console.log("Server runing at port 3000!")
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });