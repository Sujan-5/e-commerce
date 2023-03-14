import React, { useState } from 'react';
import { IconButton, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SearchFilter = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <InputBase
        placeholder="Search..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <IconButton>
        <Search />
      </IconButton>
    </form>
  );
};

export default SearchFilter;
