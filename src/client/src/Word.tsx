import React, { useRef } from 'react';
import styled from 'styled-components';
import { WeightedWord } from './WordCloud';

interface Props {
  word: WeightedWord;
  wrapperDimensions: DOMRect | null;
}

const getAlignment = () => {
  const random = Math.random();

  if (random < 1 / 3) {
    return 'flex-start';
  }

  if (random < 2 / 3) {
    return 'center';
  }

  return 'flex-end';
};

const Word = (props: Props) => {
  const wordRef = useRef<HTMLDivElement>(null);

  const { wrapperDimensions, word } = props;

  const MIN_FONT_SIZE = 1;
  const fontSize = 4 * word.weight;

  const Wrapper = styled.div`
    font-size: ${fontSize > MIN_FONT_SIZE ? fontSize : MIN_FONT_SIZE}rem;
    opacity: ${word.weight};
    align-self: ${getAlignment()};
    margin-right: 1vw;
  `;

  return <Wrapper ref={wordRef}>{word.word}</Wrapper>;
};

export default Word;
