import {
  //home page display
  PRODUCT_ALL_REQUEST,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_ALL_FAIL,
  ERRORS_CLEAR,

  //admin products
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
} from './productConstants';

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_ALL_REQUEST: //home
    case ADMIN_PRODUCT_REQUEST: //admin
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_ALL_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
      };

    case ADMIN_PRODUCT_SUCCESS: //admin
      return {
        loading: false,
        products: action.payload,
      };

    case PRODUCT_ALL_FAIL: //home
    case ADMIN_PRODUCT_FAIL: //admin
      return {
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
