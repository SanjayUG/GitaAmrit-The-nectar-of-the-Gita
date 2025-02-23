import express from 'express';
import {
  getAllVerses,
  getVersesByChapter,
  getVerseByChapterAndVerse,
  searchVersesByQuestion, 
} from '../controllers/gitaController.js';

const router = express.Router();

router.get('/', getAllVerses);
router.get('/:chapter', getVersesByChapter);
router.get('/:chapter/:verse', getVerseByChapterAndVerse);
router.post('/search', searchVersesByQuestion); // Add this

export default router;