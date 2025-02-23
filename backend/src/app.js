import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/indexDB.js';
import gitaRoutes from './routes/gitaRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/gita', gitaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));