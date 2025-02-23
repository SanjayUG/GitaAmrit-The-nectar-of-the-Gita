import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchShlokasByQuestion } from '../api/api';
import ShlokaCard from '../components/ShlokaCard';

const AskQuestion = () => {
  const [question, setQuestion] = useState('');
  const [shlokas, setShlokas] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (question.trim()) {
      const results = await searchShlokasByQuestion(question);
      setShlokas(results);
    }
  };

  return (
    <div className="ask-question">
      <h1>This advice is from KRISHNA from Bhagwat Geeta</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleSearch}>Ask</button>
      </div>
      <button onClick={() => navigate('/')} className="back-button">
        Back to Home
      </button>
      <div className="shloka-list">
        {shlokas.map((shloka) => (
          <ShlokaCard key={`${shloka.chapter}-${shloka.verse}`} shloka={shloka} />
        ))}
      </div>
    </div>
  );
};

export default AskQuestion;