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
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,

  //CREATE PRODUCT
  PRODUCT_NEW_ADMIN_REQUEST,
  PRODUCT_NEW_ADMIN_SUCCESS,
  PRODUCT_NEW_ADMIN_FAIL,
  PRODUCT_NEW_ADMIN_RESET,
} from './productConstants';

export const productsReducer = (state = { products: [] }, action) => {
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

export const createProductReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case PRODUCT_NEW_ADMIN_REQUEST: //home
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_NEW_ADMIN_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };

    case PRODUCT_NEW_ADMIN_FAIL: //home
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PRODUCT_NEW_ADMIN_RESET:
      return {
        ...state,
        error: false,
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

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
    case PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case PRODUCT_DELETE_FAIL:
    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCT_DELETE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case PRODUCT_UPDATE_RESET:
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

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
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
