import React, { Fragment, useState } from 'react';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  const [keyword, setKeyword] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment onSubmit={searchHandler}>
      <SearchIcon style={{ color: 'black' }} />
      <InputBase
        placeholder="   search..."
        onChange={(e) => setKeyword(e.target.value)}
        sx={{ input: { color: 'black' } }}
      />
    </Fragment>
  );
};

export default Search;
