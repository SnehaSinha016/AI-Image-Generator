import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import FormData from 'form-data';

dotenv.config();
const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Stability AI image generation route is live');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const form = new FormData();

    form.append('prompt', prompt);
    form.append('aspect_ratio', '1:1');
    form.append('output_format', 'png');

    const response = await axios.post(
      'https://api.stability.ai/v2beta/stable-image/generate/core',
      form,
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          ...form.getHeaders(),
        },
      }
    );
    const imageBase64 = response.data.image;
    res.status(200).json({ photo: `data:image/png;base64,${imageBase64}` });

  } catch (error) {
    console.error('Stability AI Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

export default router;
