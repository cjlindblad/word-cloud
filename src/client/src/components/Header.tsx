import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 1rem;
  text-align: center;
  width: 100%;
  background-color: #fff3;
  padding: 0.75rem 0;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  width: 80vw;
`;

const Header: React.FC = props => {
  return (
    <Wrapper>
      <Text>{props.children}</Text>
    </Wrapper>
  );
};

export default Header;
