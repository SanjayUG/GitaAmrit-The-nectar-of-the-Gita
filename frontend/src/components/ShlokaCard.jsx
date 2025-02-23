const ShlokaCard = ({ shloka }) => {
    return (
      <div className="shloka-card">
        <h3>Chapter {shloka.chapter}, Verse {shloka.verse}</h3>
        <p><strong>Shloka:</strong> {shloka.text}</p>
        <p><strong>Transliteration:</strong> {shloka.transliteration}</p>
        <p><strong>Meaning (English):</strong> {shloka.engMeaning}</p>
        <p><strong>Meaning (Hindi):</strong> {shloka.hinMeaning}</p>
        <p><strong>Word Meaning:</strong> {shloka.wordMeaning}</p>
      </div>
    );
  };
  
  export default ShlokaCard;