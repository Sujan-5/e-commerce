import axios from 'axios';
import {
  PRODUCT_ALL_REQUEST,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_ALL_FAIL,
  ERRORS_CLEAR,
} from '../reducers/Products/productConstants';

export const getProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ALL_REQUEST,
    });

    const { data } = await axios.get('/api/v1/products');

    dispatch({
      type: PRODUCT_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ALL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const errorClear = () => async (dispatch) => {
  dispatch({
    type: ERRORS_CLEAR,
  });
};
