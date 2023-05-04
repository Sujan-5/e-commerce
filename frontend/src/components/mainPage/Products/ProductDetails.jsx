import React, { useState } from 'react';
import { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import {
  getProductDetails,
  errorClear,
} from '../../../reduxFeature/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './productdetails.css';
import ReviewSection from '../Reviews/ReviewSection';
import Rating from '@mui/material/Rating';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Loader from '../FrontFeatures/Loading/Loader';
import { useAlert } from 'react-alert';
import PageNavigation from '../FrontFeatures/PageNavigation/PageNavigation';
import { addToCart } from '../../../reduxFeature/actions/cartAction';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import { writeReview } from '../../../reduxFeature/actions/reviewAction';
import { WRITE_REVIEW_RESET } from '../../../reduxFeature/reducers/Review/reviewConstants';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector((state) => state.review);

  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', params.id);

    dispatch(writeReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(errorClear());
    }

    if (success) {
      alert.success('Review Submitted Successfully');
      dispatch({ type: WRITE_REVIEW_RESET });
    }

    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, alert, error, reviewError, success]);

  const addToCartHandler = () => {
    dispatch(addToCart(params.id, quantity));
    alert.success('Item Added To Cart');
  };

  const buyProductHandler = () => {
    dispatch(addToCart(params.id, quantity));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="wrapper">
            <PageNavigation title={product.name} />
          </div>
          <div className="ProductDetails">
            <Carousel className="Carousel">
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="ImageCro"
                    key={i}
                    src={item?.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>

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
                    disabled={product.stock === 0} //for BUG previously this line was not here
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>

                  {/* for BUY NOW  */}
                  <Link to="/cart">
                    <button
                      disabled={product.stock === 0}
                      onClick={buyProductHandler}
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
                <p>
                  Status:{' '}
                  <b
                    className={
                      product.stock <= 0
                        ? 'outstock'
                        : product.stock <= 10
                        ? 'lowstock'
                        : 'instock'
                    }
                  >
                    {product.stock <= 0
                      ? 'OutOfStock'
                      : product.stock <= 10
                      ? 'Low on Stock'
                      : ' In Stock'}
                  </b>
                </p>
              </div>
              <div className="delivery">
                <h3>Delivery</h3>
                <div className="standardDelivery">
                  <LocalShippingIcon />
                  <div className="deliveryInfo">
                    <p className="deliveryType">Standard Delivery</p>
                    <p className="deliveryTime">1 Day</p>
                    <p className="deliveryPrice">Rs. 50</p>
                  </div>
                </div>
                <p className="cashDelivery">Cash on Delivery Available</p>
              </div>
            </div>
          </div>
          <div className="Desc">
            <div className="block4">
              <h3>Description : </h3>
              <p>{product.description}</p>
            </div>
            <div className="reviewButton">
              <button className="Review" onClick={submitReviewToggle}>
                Review this product
              </button>
              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />

                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <div className="ReviewSection">
            <h3 className="reviewHead">Ratings & Reviews</h3>

            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewSection key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews in this Product</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
