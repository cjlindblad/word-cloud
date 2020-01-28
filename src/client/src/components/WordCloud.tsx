import React from 'react';
import styled from 'styled-components';

import Word from './Word';

export interface WeightedWord {
  word: string;
  count: number;
  weight: number;
}

interface Props {
  words?: WeightedWord[];
  isFetching: boolean;
}

const Wrapper = styled.div<{ isFetching: boolean }>`
  max-width: 90vw;
  height: 80vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const WordCloud = React.memo((props: Props) => {
  const { words, isFetching } = props;

  return (
    <Wrapper isFetching={isFetching}>
      {isFetching && 'Loading..'}
      {words && words.map(word => <Word key={word.word} word={word} />)}
    </Wrapper>
  );
});

export default WordCloud;
