import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AskQuestion from './pages/AskQuestion';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ask-question" element={<AskQuestion />} />
    </Routes>
  );
};

export default App;