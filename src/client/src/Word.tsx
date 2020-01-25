import React from 'react';
import styled from 'styled-components';
import { WeightedWord } from './WordCloud';

interface Props {
  word: WeightedWord;
}

const Word = (props: Props) => {
  const { word } = props;

  const Wrapper = styled.div`
    position: absolute;
    font-size: ${word.count}px;
    margin-left: ${Math.random() * 500 - 250}px;
    margin-top: ${Math.random() * 300 - 150}px;
  `;

  return <Wrapper>{word.word}</Wrapper>;
};

export default Word;
