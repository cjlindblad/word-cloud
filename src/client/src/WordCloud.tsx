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
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid red;
`;

const WordCloud = React.memo((props: Props) => {
  const { words } = props;

  return (
    <Wrapper>
      {words && words.map(word => <Word key={word.word} word={word} />)}
    </Wrapper>
  );
});

export default WordCloud;
