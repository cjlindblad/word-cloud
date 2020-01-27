import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';

import searchIcon from './icons/search.svg';
import WordCloud, { WeightedWord } from './WordCloud';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 19px;
  border-color: transparent;
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  height: 100%;
  padding-right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const App: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [weightedWords, setWeightedWords] = useState<
    WeightedWord[] | undefined
  >(undefined);

  const handleSubmit = async () => {
    try {
      setWeightedWords(undefined);
      setIsFetching(true);
      const result = await fetch(
        `/word-cloud?searchTerm=${encodeURIComponent(searchTerm)}`
      ).then(response => {
        if (!response.ok) {
          throw new Error('Något gick fel! 😰');
        }

        return response.json();
      });

      setWeightedWords(result.wordCloud);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Wrapper>
      <InputWrapper>
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
        />
        <Button onClick={handleSubmit}>
          <SearchIcon src={searchIcon} />
        </Button>
      </InputWrapper>
      <WordCloud words={weightedWords} isFetching={isFetching} />
    </Wrapper>
  );
};

export default App;
