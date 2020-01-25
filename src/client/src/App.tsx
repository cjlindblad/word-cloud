import React, { useState } from 'react';
import './App.css';

import WordCloud, { WeightedWord } from './WordCloud';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weightedWords, setWeightedWords] = useState<
    WeightedWord[] | undefined
  >(undefined);

  const handleSubmit = async () => {
    try {
      const result = await fetch(
        `/word-cloud?searchTerm=${encodeURIComponent(searchTerm)}`
      ).then(res => res.json());

      setWeightedWords(result.wordCloud);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={searchTerm}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
          onChange={event => {
            setSearchTerm(event.target.value);
          }}
        ></input>
        <button onClick={handleSubmit}>GO</button>
        <WordCloud words={weightedWords} />
      </header>
    </div>
  );
};

export default App;
