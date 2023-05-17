import {
  WRITE_REVIEW_REQUEST,
  WRITE_REVIEW_SUCCESS,
  WRITE_REVIEW_FAIL,
  WRITE_REVIEW_RESET,
  ALL_PRODUCT_REVIEW_REQUEST,
  ALL_PRODUCT_REVIEW_SUCCESS,
  ALL_PRODUCT_REVIEW_FAIL,
  DELETE_PRODUCT_REVIEW_REQUEST,
  DELETE_PRODUCT_REVIEW_SUCCESS,
  DELETE_PRODUCT_REVIEW_RESET,
  DELETE_PRODUCT_REVIEW_FAIL,

  //for error
  ERRORS_CLEAR,
} from './reviewConstants';

export const writeReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case WRITE_REVIEW_REQUEST: //home
      return {
        ...state,
        loading: true,
      };
    case WRITE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case WRITE_REVIEW_FAIL: //home
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case WRITE_REVIEW_RESET:
      return {
        ...state,
        success: false,
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

export const allReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REVIEW_REQUEST: //home
      return {
        ...state,
        loading: true,
      };
    case ALL_PRODUCT_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case ALL_PRODUCT_REVIEW_FAIL: //home
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_PRODUCT_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
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
