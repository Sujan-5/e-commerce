import {
  WRITE_REVIEW_REQUEST,
  WRITE_REVIEW_SUCCESS,
  WRITE_REVIEW_FAIL,
  ALL_PRODUCT_REVIEW_REQUEST,
  ALL_PRODUCT_REVIEW_SUCCESS,
  ALL_PRODUCT_REVIEW_FAIL,
  DELETE_PRODUCT_REVIEW_REQUEST,
  DELETE_PRODUCT_REVIEW_SUCCESS,
  DELETE_PRODUCT_REVIEW_FAIL,

  //error
  ERRORS_CLEAR,
} from '../reducers/Review/reviewConstants';
import axios from 'axios';

//write Review
export const writeReview = (dataOfReview) => async (dispatch) => {
  try {
    dispatch({ type: WRITE_REVIEW_REQUEST });

    const env = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put(`/api/v1/review`, dataOfReview, env);

    dispatch({ type: WRITE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: WRITE_REVIEW_FAIL, payload: error.response.data.message });
  }
};

// Get All Reviews of a Product
export const getAllAdminReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_PRODUCT_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_PRODUCT_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const errorClear = () => async (dispatch) => {
  dispatch({
    type: ERRORS_CLEAR,
  });
};
