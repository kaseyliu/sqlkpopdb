import React, { useState } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ onSearch }) => {
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = () => {
    onSearch(searchVal);
  };

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<BsSearch onClick={handleSearch} style={{ cursor: 'pointer' }} />}
      />
      <Input
        type="text"
        placeholder="Search by name..."
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
    </InputGroup>
  );
};

export default SearchBar;