import express from 'express'
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'


import Post from '../mongodb/models/post.js';
 
dotenv.config();
const router=express.Router();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
     api_key:process.env.CLOUDINARY_API_KEY,
      api_secret:process.env.CLOUDINARY_API_SECRET,
});
//get all posts
router.route('/').get(async(req,res)=>{
try {
    const posts=await Post.find({ });
    res.status(200).json({success:true,data:posts})
} catch (error) {
    res.status(500).json({success:false,message:error}) 
}
});
//CREATE
router.post('/', async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    // Check for duplicate
    const existing = await Post.findOne({ photo });
    if (existing) {
      return res.status(409).json({ message: 'Duplicate image already exists.', post: existing });
    }

    // Check for existing image by photo content (exact match)
const existingPost = await Post.findOne({ photo });

if (existingPost) {
  return res.status(200).json({
    success: true,
    data: existingPost,
    message: 'Duplicate image already exists, returning existing post.',
  });
}

// Only create if not duplicate
const newPost = await Post.create({ name, prompt, photo });
res.status(201).json({ success: true, data: newPost });

    res.status(201).json({ success: true, data: newPost });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



export default router;
