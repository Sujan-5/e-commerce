import {
  CATEGORY_ALL_REQUEST,
  CATEGORY_ALL_SUCCESS,
  CATEGORY_ALL_FAIL,
  ERRORS_CLEAR,

  //create product
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
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
