import React from 'react';
import Navbar from './HomePage/Navbar';
import Feed from './HomePage/Feed';
import { Box, Container } from '@mui/material';
import Promotions from './HomePage/Promotions';
import Category from './HomePage/Category';
import Footer from './HomePage/Footer';

const allPages = () => {
  return (
    <Box>
      <Navbar />
      <Feed />
      <Promotions />
      <Container>
        <Category />
      </Container>
      <Footer />
    </Box>
  );
};
export default allPages;
