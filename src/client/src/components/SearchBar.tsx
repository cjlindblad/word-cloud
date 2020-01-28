import React, { useState } from 'react';
import styled from 'styled-components';

import searchIcon from '../icons/search.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const Input = styled.input`
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 19px;
  border-color: transparent;
  width: 210px;
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  height: 100%;
  padding-right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

interface Props {
  onSubmit: (searchTerm: string) => void;
  className?: string;
}

const SearchBar = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = () => {
    if (searchTerm.length > 0) {
      props.onSubmit(searchTerm);
    }
  };

  return (
    <Wrapper className={props.className}>
      <Input
        type="text"
        placeholder="Search for twitter hashtag"
        value={searchTerm}
        onKeyDown={event => {
          if (event.key === 'Enter' && searchTerm.length > 0) {
            handleSubmit();
          }
        }}
        onChange={event => {
          setSearchTerm(event.target.value);
        }}
      />
      <Button onClick={handleSubmit}>
        <Icon src={searchIcon} />
      </Button>
    </Wrapper>
  );
};

export default SearchBar;
