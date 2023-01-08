import React from 'react';
import Navbar from './HomePage/Navbar';
import Feed from './HomePage/Feed';
import { Box, Container } from '@mui/material';
import Promotions from './HomePage/Promotions';
import Products from './Products/Products';
import Category from './HomePage/Category';

const allPages = () => {
  //styles
  const styles = {
    container: {
      display: 'flex',
      margin: '2vmax auto',
      width: '80vw',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: '100%',
    },
  };

  return (
    <Box>
      <Navbar />
      <Feed />
      <Promotions />
      <Container>
        <Category />
      </Container>
      <div className="container" style={styles.container}>
        <Products />
        <Products />
        <Products />
        <Products />

        <Products />
        <Products />
        <Products />
        <Products />
      </div>
    </Box>
  );
};
export default allPages;
