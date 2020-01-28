import React, { useState } from 'react';
import styled from 'styled-components';

import Api from '../api/index';
import Header from '../components/Header';
import StylableSearchBar from '../components/SearchBar';
import WordCloud, { WeightedWord } from '../components/WordCloud';
import Status from '../components/Status';
import Footer from '../components/Footer';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Content = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBar = styled(StylableSearchBar)`
  margin: 2.5vh 0 5vh;
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

      const result = await Api.getWordCloud(searchTerm, 100);

      setWeightedWords(result.wordCloud);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Wrapper>
      <Header>Tag Cloud by Carl-Johan Lindblad</Header>
      <Content>
        <SearchBar onSubmit={handleSubmit} />
        <Status isFetching={isFetching} errorMessage={errorMessage} />
        <WordCloud words={weightedWords} />
      </Content>
      <Footer>
        <a href="mailto:carljohan.lindblad@gmail.com">
          carljohan.lindblad@gmail.com
        </a>
        <a href="tel:0763-903809">0763-903809</a>
      </Footer>
    </Wrapper>
  );
};

export default App;
