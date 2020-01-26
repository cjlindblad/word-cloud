import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import { WeightedWord } from './WordCloud';

interface Props {
  word: WeightedWord;
  wrapperDimensions: DOMRect | null;
}

const Word = (props: Props) => {
  const wordRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<DOMRect | null>(null);
  useLayoutEffect(() => {
    setDimensions(wordRef!.current!.getBoundingClientRect());
  }, []);

  const { wrapperDimensions, word } = props;

  let leftMargin = 0;
  let topMargin = 0;
  if (dimensions && wrapperDimensions) {
    const horizontalSlack = wrapperDimensions.width - dimensions.width;
    const verticalSlack = wrapperDimensions.height - dimensions.height;

    leftMargin = Math.random() * horizontalSlack - horizontalSlack / 2;
    topMargin = Math.random() * verticalSlack - verticalSlack / 2;
  }

  const MIN_FONT_SIZE = 0.5;
  const fontSize = 5 * word.weight;

  const Wrapper = styled.div`
    position: absolute;
    font-size: ${fontSize > MIN_FONT_SIZE ? fontSize : MIN_FONT_SIZE}rem;
    opacity: ${word.weight};
    margin-left: ${leftMargin}px;
    margin-top: ${topMargin}px;
  `;

  return <Wrapper ref={wordRef}>{word.word}</Wrapper>;
};

export default Word;
