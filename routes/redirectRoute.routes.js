import express from 'express';
import { Url } from '../models/urls.models.js';

const router = express.Router();

router.get('/:shortUrl', async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });
    if (!url) return res.status(404).send('Not found');

    url.visits += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;