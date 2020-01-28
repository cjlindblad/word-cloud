import React from 'react';
import styled from 'styled-components';

import loadingPuff from '../assets/loading-puff.svg';

const Wrapper = styled.div`
  max-width: 75vw;
  text-align: center;
`;

const Loader = styled.img``;

interface Props {
  isFetching: boolean;
  errorMessage?: string;
}

const Status = (props: Props) => {
  const { isFetching, errorMessage } = props;
  return (
    <Wrapper>
      {isFetching && <Loader src={loadingPuff} />}
      {!isFetching && errorMessage}
    </Wrapper>
  );
};

export default Status;
