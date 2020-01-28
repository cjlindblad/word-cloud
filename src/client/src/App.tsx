import React, { useState } from 'react';
import styled from 'styled-components';

import StylableSearchBar from './SearchBar';
import WordCloud, { WeightedWord } from './WordCloud';

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
  const [weightedWords, setWeightedWords] = useState<
    WeightedWord[] | undefined
  >(undefined);

  const handleSubmit = async (searchTerm: string) => {
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
      <SearchBar onSubmit={handleSubmit} />
      <WordCloud words={weightedWords} isFetching={isFetching} />
    </Wrapper>
  );
};

export default App;
