import mongoose from 'mongoose';

const gitaVerseSchema = mongoose.Schema(
  {
    chapter: { type: Number, required: true },
    verse: { type: Number, required: true },
    text: { type: String, required: true },
    transliteration: { type: String },
    hinMeaning: { type: String },
    engMeaning: { type: String },
    wordMeaning: { type: String },
  },
  { timestamps: true }
);

const GitaVerse = mongoose.model('GitaVerse', gitaVerseSchema);
export default GitaVerse;