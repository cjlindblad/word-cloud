import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
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

  border: 1px solid #ffffffaa;
`;

const WordCloud = React.memo((props: Props) => {
  const cloudRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<DOMRect | null>(null);
  useLayoutEffect(() => {
    setDimensions(cloudRef!.current!.getBoundingClientRect());
  }, []);

  const { words } = props;

  return (
    <Wrapper ref={cloudRef}>
      {words &&
        words.map(word => (
          <Word wrapperDimensions={dimensions} key={word.word} word={word} />
        ))}
    </Wrapper>
  );
});

export default WordCloud;
