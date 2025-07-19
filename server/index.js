import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import stability from './routes/stability.js'
  dotenv.config();
  const app=express();
  app.use(cors());
  app.use(express.json({limit:'50mb'}));
  app.use('/api/v1/post',postRoutes);
  app.use('/api/v1/stability',stability);
  app.get('/',async(req,res)=>{
    res.send('hello from Stability!');
  })
  const startserver=async()=>{
    try{
       await connectDB(process.env.MongoDB_url);
        app.listen(8080,()=>console.log(`Server has started on port http://localhost:8080`));
    }
    catch{
        (err)=>console.log('error:',err.message);
    }
    
  };
  startserver();