import {
  //all order
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_ALL_FAIL,

  //update order
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_RESET,
  ORDER_UPDATE_FAIL,

  //delete order
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_RESET,
  ORDER_DELETE_FAIL,
  ERRORS_CLEAR,
} from './orderConstants';

export const adminOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ALL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_ALL_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_ALL_FAIL:
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

export const upAndDelOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
    case ORDER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case ORDER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case ORDER_UPDATE_FAIL:
    case ORDER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ORDER_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case ORDER_DELETE_RESET:
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
