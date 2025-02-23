import GitaVerse from '../models/gitaVerseModel.js';
import natural from 'natural';
const { WordTokenizer, Stemmer } = natural;

export const getAllVerses = async (req, res) => {
  try {
    const verses = await GitaVerse.find({});
    res.json(verses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVersesByChapter = async (req, res) => {
  try {
    const verses = await GitaVerse.find({ chapter: req.params.chapter });
    res.json(verses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVerseByChapterAndVerse = async (req, res) => {
  try {
    const verse = await GitaVerse.findOne({
      chapter: req.params.chapter,
      verse: req.params.verse,
    });
    res.json(verse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Use the PorterStemmer directly from the natural object
const stemmer = natural.PorterStemmer;

export const searchVersesByQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    // Validate the question
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ message: 'Invalid question provided.' });
    }

    // Fetch all shlokas from the database
    const allShlokas = await GitaVerse.find({});

    // Tokenize and stem the question
    const tokenizer = new WordTokenizer();
    const questionTokens = tokenizer.tokenize(question.toLowerCase());
    const questionStems = questionTokens.map((token) => stemmer.stem(token));

    // Score shlokas based on keyword matches
    const scoredShlokas = allShlokas.map((shloka) => {
      const shlokaText = `${shloka.engMeaning} ${shloka.hinMeaning}`.toLowerCase();
      const shlokaTokens = tokenizer.tokenize(shlokaText);
      const shlokaStems = shlokaTokens.map((token) => stemmer.stem(token));

      // Calculate match score
      const score = questionStems.reduce((total, stem) => {
        return total + (shlokaStems.includes(stem) ? 1 : 0);
      }, 0);

      return { ...shloka.toObject(), score };
    });

    // Filter and sort shlokas by score
    const relevantShlokas = scoredShlokas
      .filter((shloka) => shloka.score > 0)
      .sort((a, b) => b.score - a.score);

    // Limit the response to a maximum of 10 shlokas
    const limitedShlokas = relevantShlokas.slice(0, 10);

    // Return the relevant shlokas
    res.json(limitedShlokas);
  } catch (error) {
    console.error('Error in searchVersesByQuestion:', error);
    res.status(500).json({ message: 'An error occurred while processing your question.' });
  }
};

