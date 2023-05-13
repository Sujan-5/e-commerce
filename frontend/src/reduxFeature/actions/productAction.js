import axios from 'axios';
import {
  //for home page products
  PRODUCT_ALL_REQUEST,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_ALL_FAIL,
  ALL_PRODUCT_REQUEST_HOME,
  ALL_PRODUCT_SUCCESS_HOME,
  ALL_PRODUCT_FAIL_HOME,
  ERRORS_CLEAR,

  //admin products
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,

  //CREATE PRODUCT
  PRODUCT_NEW_ADMIN_REQUEST,
  PRODUCT_NEW_ADMIN_SUCCESS,
  PRODUCT_NEW_ADMIN_FAIL,
} from '../reducers/Products/productConstants';

//get products for product page
export const getProduct =
  (keyword = '', currentPage = 1, minPrice = 0, maxPrice = 2000) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_ALL_REQUEST,
      });

      let urll = `/api/v1/products?keyword=${keyword}&page=${currentPage}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

      const { data } = await axios.get(urll);

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

//get products for home page
export const getProductsHome = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST_HOME,
    });

    const { data } = await axios.get(`/api/v1/products/home`);

    dispatch({
      type: ALL_PRODUCT_SUCCESS_HOME,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL_HOME,
      payload: error.response.data.message,
    });
  }
};

// Create admin Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_NEW_ADMIN_REQUEST });

    const env = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(
      `/api/v1/admin/create/product`,
      productData,
      env
    );

    dispatch({
      type: PRODUCT_NEW_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_NEW_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update admin Product
export const updateProductDetails = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete admin Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get products for admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get('/api/v1/admin/products');

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getadminProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const errorClear = () => async (dispatch) => {
  dispatch({
    type: ERRORS_CLEAR,
  });
};
