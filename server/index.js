import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js'
import stability from './routes/stability.js'
  dotenv.config();
  const app=express();
  const PORT = process.env.PORT || 8000;
  const allowedOrigins = [
  'https://ai-image-generator-fmfg.vercel.app',
];
  app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: ['GET', 'POST','OPTIONS'],
  credentials: true,
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

  app.use(express.json({limit:'50mb'}));
  app.use('/api/v1/post',postRoutes);
  app.use('/api/v1/stability',stability);
  app.get('/',async(req,res)=>{
    res.send('hello from Stability!');
  })
  const startserver=async()=>{
    try{
       await connectDB(process.env.MongoDB_url);
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch(err){console.error('error starting server:',err.message);
    } 
  };
  startserver();