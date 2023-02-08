import React from 'react';
import { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
  getProductDetails,
  errorClear,
} from '../../../reduxFeature/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './productdetails.css';
import ReviewSection from '../Reviews/ReviewSection';
import Rating from '@mui/material/Rating';
import Navbar from '../HomePage/Navbar';
import Loader from '../FrontFeatures/Loading/Loader';
import { useAlert } from 'react-alert';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, alert, error]);

  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const addToCartHandler = () => {
    // dispatch(addItemsToCart(params.id, quantity));
    alert.success('Item Added To Cart');
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Navbar />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="ImageCro"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="block1">
                <h2>{product.name}</h2>
              </div>
              <div className="block2">
                <Rating {...options} />
                <span className="block2-span">
                  {' '}
                  ({product.numofReviews} Reviews)
                </span>
              </div>
              <div className="block3">
                <h1>{`Rs ${product.price}`}</h1>
                <div className="block31">
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                  {/* for BUY NOW 
              <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>
                Buy Now
              </button> */}
                </div>
                <p>
                  Status:
                  <b
                    className={
                      product.Stock <= 0
                        ? 'outstock'
                        : product.Stock <= 10
                        ? 'lowstock'
                        : 'instock'
                    }
                  >
                    {product.Stock <= 0
                      ? 'OutOfStock'
                      : product.Stock <= 10
                      ? 'Low on Stock'
                      : ' In Stock'}
                  </b>
                </p>
              </div>
              <div className="block4">
                Description : <p>{product.description}</p>
              </div>

              <button className="Review">Review</button>
            </div>
          </div>

          <h3 className="reviewHead">Ratings & Reviews</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewSection review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews in this Product</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
