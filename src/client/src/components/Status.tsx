import React from 'react';
import styled from 'styled-components';

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
      {isFetching && 'Laddar..'}
      {!isFetching && errorMessage}
    </Wrapper>
  );
};

export default Status;
