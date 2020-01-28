import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0.75rem 0;
  font-size: 1rem;
  white-space: pre-wrap;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 5vh;

  a {
    color: white;
    margin-bottom: 4px;
  }
`;

const Footer: React.FC = props => {
  return <Wrapper>{props.children}</Wrapper>;
};

export default Footer;
