import React from 'react';
import Navbar from './Navbar';
import Feed from './Feed';
import { Box, Container } from '@mui/material';
import Promotions from './Promotions';
import Category from './/Category';

const allPages = () => {
  return (
    <Box>
      <Navbar />
      <Feed />
      <Promotions />
      <Container>
        <Category />
      </Container>
    </Box>
  );
};
export default allPages;
