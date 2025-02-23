import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');

  const handleSearch = () => {
    // Convert chapter and verse to numbers
    const chapterNum = chapter ? parseInt(chapter, 10) : undefined;
    const verseNum = verse ? parseInt(verse, 10) : undefined;

    if (chapterNum && verseNum) {
      onSearch({ chapter: chapterNum, verse: verseNum });
    } else if (chapterNum) {
      onSearch({ chapter: chapterNum });
    } else {
      onSearch({});
    }
  };

  return (
    <div className="search-bar">
      <input
        type="number"
        placeholder="Chapter"
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
      />
      <input
        type="number"
        placeholder="Verse"
        value={verse}
        onChange={(e) => setVerse(e.target.value)}
      />
      <button onClick={handleSearch}>Get it</button>
    </div>
  );
};

export default SearchBar;