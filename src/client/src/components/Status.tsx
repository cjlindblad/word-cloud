import React from 'react';
import styled from 'styled-components';

import loadingPuff from '../assets/loading-puff.svg';

const Wrapper = styled.div`
  max-width: 75vw;
  text-align: center;
`;

interface Props {
  isFetching: boolean;
  errorMessage?: string;
}

const Status = (props: Props) => {
  const { isFetching, errorMessage } = props;
  return (
    <Wrapper>
      {isFetching && <img alt="loading" src={loadingPuff} />}
      {!isFetching && errorMessage}
    </Wrapper>
  );
};

export default Status;
