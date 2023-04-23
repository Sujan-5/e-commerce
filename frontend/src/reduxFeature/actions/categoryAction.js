import axios from 'axios';
import {
  //get all category
  CATEGORY_ALL_REQUEST,
  CATEGORY_ALL_SUCCESS,
  CATEGORY_ALL_FAIL,
  ERRORS_CLEAR,

  //new category
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,

  //update and delete
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,

  //all category
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
} from '../reducers/category/categoryConstants';

export const getAllCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_ALL_REQUEST });

    const { data } = await axios.get('/api/v1/category/all');

    // const categoryList = data;
    // console.log(data);

    dispatch({
      type: CATEGORY_ALL_SUCCESS,
      payload: data,
      // payload: { categories: categoryList },
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ALL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addCategory = (form) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });

    const env = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(`/api/v1/category/new`, form, env);

    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
    console.log(error.response.data.message);
  }
};

// Update admin CATEGORY
export const updateCategoryDetails = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_UPDATE_REQUEST });

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    const { data } = await axios.put(`/api/v1/category/${id}`, form, config);

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete admin Category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/v1/category/${id}`);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getadminCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/category/${id}`);

    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const errorClear = () => async (dispatch) => {
  dispatch({
    type: ERRORS_CLEAR,
  });
};
