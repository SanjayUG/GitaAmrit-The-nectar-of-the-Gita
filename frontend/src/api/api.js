import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api/gita';
const API_BASE_URL = 'https://gitaamrit-the-nectar-of-the-gita.onrender.com/api/gita';

export const getAllShlokas = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
};

export const getShlokasByChapter = async (chapter) => {
  const response = await axios.get(`${API_BASE_URL}/${chapter}`);
  return response.data;
};

export const getShlokaByChapterAndVerse = async (chapter, verse) => {
  const response = await axios.get(`${API_BASE_URL}/${chapter}/${verse}`);
  return response.data;
};

export const searchShlokasByQuestion = async (question) => {
  // This will be implemented later (Step 6)
  const response = await axios.post(`${API_BASE_URL}/search`, { question });
  return response.data;
};