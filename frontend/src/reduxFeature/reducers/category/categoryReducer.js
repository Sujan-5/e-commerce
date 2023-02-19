import {
  CATEGORY_ALL_REQUEST,
  CATEGORY_ALL_SUCCESS,
  CATEGORY_ALL_FAIL,
  ERRORS_CLEAR,

  //create product
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,

  //update and delete
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_RESET,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_RESET,
} from './categoryConstants';

const initialState = {
  loading: false,
  categories: [],
  error: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_ALL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CATEGORY_ALL_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case CATEGORY_ALL_FAIL: //admin
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ERRORS_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const createCategoryReducer = (state = { categories: {} }, action) => {
  switch (action.type) {
    case NEW_CATEGORY_REQUEST: //home
      return {
        ...state,
        loading: true,
      };
    case NEW_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        category: action.payload.category,
      };

    case NEW_CATEGORY_FAIL: //home
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const categoryUDReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
    case CATEGORY_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case CATEGORY_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case CATEGORY_DELETE_FAIL:
    case CATEGORY_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CATEGORY_DELETE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CATEGORY_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case ERRORS_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
