import express from 'express';
import fetch from 'node-fetch';
import Bookmark from '../models/Bookmark.Models.js';
import verifyToken from '../middelware/VerifyJWT.Middleware.js';
import { fetchMetadata } from '../Utils/fetchMetaData.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { url } = req.body;

  try {
    const { title, favicon } = await fetchMetadata(url);

    const encodedUrl = encodeURIComponent(url);
   const summaryRes = await fetch(`https://r.jina.ai/${encodedUrl}`);

    if (!summaryRes.ok) {
      throw new Error(`Jina AI Error: ${summaryRes.status}`);
    }

    const summary = await summaryRes.text();

    const bookmark = new Bookmark({
      userId: req.userId,
      url,
      title,
      favicon,
      summary,
    });

    await bookmark.save();
    res.status(201).json(bookmark);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to save bookmark or fetch summary' });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(bookmarks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});
// DELETE: Remove a bookmark by ID
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: id, userId: req.userId });

    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found or unauthorized' });
    }

    res.status(200).json({ message: 'Bookmark deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to delete bookmark' });
  }
});


export default router;
