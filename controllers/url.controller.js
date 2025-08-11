import { nanoid } from 'nanoid';
import { Url } from '../models/urls.models.js';

export const generateShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) return res.status(400).json({ error: 'originalUrl is required' });

        const existing = await Url.findOne({ originalUrl });
        if (existing) {
            return res.json({ shortUrl: `${process.env.BASE_URL}/${existing.shortUrl}` });
        }

        const shortCode = nanoid(6);
        const url = await Url.create({ originalUrl, shortUrl: shortCode });
        return res.json({ shortUrl: `${process.env.BASE_URL}/${url.shortUrl}` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        return res.json(urls);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};