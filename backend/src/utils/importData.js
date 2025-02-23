import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser'; // Install this package for CSV parsing
import GitaVerse from '../models/gitaVerseModel.js';
import connectDB from '../db/indexDB.js';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

connectDB();

const importData = async () => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'dataset', 'Bhagwad_Gita.csv');
    const results = [];

    // Read and parse the CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Map CSV data to your schema
        results.push({
          chapter: parseInt(data.Chapter),
          verse: parseInt(data.Verse),
          text: data.Shloka,
          transliteration: data.Transliteration,
          hinMeaning: data.HinMeaning,
          engMeaning: data.EngMeaning,
          wordMeaning: data.WordMeaning,
        });
      })
      .on('end', async () => {
        // Insert data into MongoDB
        await GitaVerse.deleteMany({}); // Clear existing data
        await GitaVerse.insertMany(results); // Insert new data
        console.log('Data imported successfully!');
        process.exit();
      });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();