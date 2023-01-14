import {
  PRODUCT_ALL_REQUEST,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_ALL_FAIL,
  ERRORS_CLEAR,
} from './productConstants';

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_ALL_REQUEST:
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
    case PRODUCT_ALL_FAIL:
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
