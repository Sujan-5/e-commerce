import React from 'react';
import Navbar from './HomePage/Navbar';
import Feed from './HomePage/Feed';
import { Box, Container } from '@mui/material';
import Promotions from './HomePage/Promotions';
import Products from './Products/Products';
import Category from './HomePage/Category';
import { getProduct } from '../../reduxFeature/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Loader from './FrontFeatures/Loading/Loader';
import { useAlert } from 'react-alert';

const HomePage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

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
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Navbar />

          <Feed />
          <Promotions />
          <Container>
            <Category />
          </Container>
          <div className="container" id="container" style={styles.container}>
            {products &&
              products.map((product, index) => (
                <Products product={product} key={index} />
              ))}
          </div>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
