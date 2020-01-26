import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';

import WordCloud, { WeightedWord } from './WordCloud';

const Input = styled.input`
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 19px;
  border-color: transparent;
`;

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
        <Input
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
        ></Input>
        <button onClick={handleSubmit}>GO</button>
        <WordCloud words={weightedWords} />
      </header>
    </div>
  );
};

export default App;
