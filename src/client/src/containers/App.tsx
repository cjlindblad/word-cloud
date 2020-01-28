import React, { useState } from 'react';
import styled from 'styled-components';

import Api from '../api/index';
import StylableSearchBar from '../components/SearchBar';
import WordCloud, { WeightedWord } from '../components/WordCloud';
import Status from '../components/Status';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const SearchBar = styled(StylableSearchBar)`
  margin: 5vh 0;
`;

const App: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [weightedWords, setWeightedWords] = useState<WeightedWord[]>([]);

  const handleSubmit = async (searchTerm: string) => {
    try {
      setWeightedWords([]);
      setErrorMessage(undefined);
      setIsFetching(true);

      const result = await Api.getWordCloud(searchTerm);

      setWeightedWords(result.wordCloud);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Wrapper>
      <SearchBar onSubmit={handleSubmit} />
      <Status isFetching={isFetching} errorMessage={errorMessage} />
      <WordCloud words={weightedWords} />
    </Wrapper>
  );
};

export default App;
