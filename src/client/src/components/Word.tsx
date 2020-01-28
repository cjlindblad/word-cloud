import React from 'react';
import styled from 'styled-components';
import { WeightedWord } from './WordCloud';

interface Props {
  word: WeightedWord;
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
  const { word } = props;

  const MIN_FONT_SIZE_IN_REM = 1;
  const fontSize = 4 * word.weight;

  const Wrapper = styled.div`
    font-size: ${fontSize > MIN_FONT_SIZE_IN_REM
      ? fontSize
      : MIN_FONT_SIZE_IN_REM}rem;
    opacity: ${word.weight};
    align-self: ${getAlignment()};
  `;

  return <Wrapper>{word.word}</Wrapper>;
};

export default Word;
