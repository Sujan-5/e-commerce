import React from 'react';
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
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

const StyledContainer = styled(Container)`
  width: 100%;
`;

const HomePage = () => {
  const params = useParams();

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct(keyword));
  }, [dispatch, error, alert, keyword]);

  //styles
  const styles = {
    container: {
      display: 'flex',
      margin: '3vmax auto',
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
          <Feed />
          <Promotions />
          <StyledContainer>
            <h2 className="h2" style={styles.h2}>
              Main Features
            </h2>
            <Category />
          </StyledContainer>
          <h2 className="h2" style={styles.h2}>
            Products
          </h2>
          <div className="container" id="container" style={styles.container}>
            {products &&
              products.map((product) => (
                <Products product={product} key={product._id} />
              ))}
          </div>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
