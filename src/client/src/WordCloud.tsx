import React, { useState, useRef, useLayoutEffect } from 'react';
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
  const cloudRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<DOMRect | null>(null);
  useLayoutEffect(() => {
    setDimensions(cloudRef!.current!.getBoundingClientRect());
  }, []);

  const { words, isFetching } = props;

  return (
    <Wrapper isFetching={isFetching} ref={cloudRef}>
      {isFetching && 'Loading..'}
      {words &&
        words.map(word => (
          <Word wrapperDimensions={dimensions} key={word.word} word={word} />
        ))}
    </Wrapper>
  );
});

export default WordCloud;
