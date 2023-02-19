import React from 'react';
import Navbar from './HomePage/Navbar';
import Feed from './HomePage/Feed';
import { Box, Container } from '@mui/material';
import Promotions from './HomePage/Promotions';
import Products from './Products/Productcard';
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
    h2: {
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontSize: '1.4vmax',
      borderBottom: '1px solid',
      width: '20vmax',
      padding: '1vmax',
      margin: '5vmax auto',
      color: 'rgb(0, 0, 0, 0.7)',
      marginTop: '10px',
      marginBottom: '20px',
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
            <h2 className="h2" style={styles.h2}>
              Main Features
            </h2>
            <Category />
          </Container>
          <h2 className="h2" style={styles.h2}>
            Products
          </h2>
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
