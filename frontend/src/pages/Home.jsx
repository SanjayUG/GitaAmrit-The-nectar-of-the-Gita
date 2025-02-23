import { useState, useEffect } from 'react';
import ShlokaCard from '../components/ShlokaCard';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { getAllShlokas, getShlokasByChapter, getShlokaByChapterAndVerse } from '../api/api';

const Home = () => {
  const [shlokas, setShlokas] = useState([]);

  // Handle search by chapter/verse
  const handleSearch = async ({ chapter, verse }) => {
    try {
      if (chapter && verse) {
        const result = await getShlokaByChapterAndVerse(chapter, verse);
        setShlokas(result ? [result] : []);
      } else if (chapter) {
        const results = await getShlokasByChapter(chapter);
        setShlokas(results);
      } else {
        const results = await getAllShlokas();
        setShlokas(results);
      }
    } catch (error) {
      console.error('Error searching for shlokas:', error);
      setShlokas([]); // Clear the shlokas if there's an error
    }
  };

  const navigate = useNavigate();

  // Fetch all shlokas on page load
  useEffect(() => {
    handleSearch({});
  }, []);

  return (
    <div className="home">
      <h1>GitaAmrit: The nectar of the Gita</h1>

      {/* Search Bar for Chapter/Verse */}
      <SearchBar onSearch={handleSearch} />

      <button onClick={() => navigate('/ask-question')} className="ask-question-button">
      Need Clarity? Just Ask!
      </button>

      {/* Display Shlokas */}
      <div className="shloka-list">
        {shlokas.map((shloka) => (
          <ShlokaCard key={`${shloka.chapter}-${shloka.verse}`} shloka={shloka} />
        ))}
      </div>
    </div>
  );
};

export default Home;