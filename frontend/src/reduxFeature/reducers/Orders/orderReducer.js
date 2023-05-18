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
  ERRORS_CLEAR,

  //details
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,

  //my order
  OWN_ORDER_REQUEST,
  OWN_ORDER_SUCCESS,
  OWN_ORDER_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
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

export const updateOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
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

    case ORDER_UPDATE_FAIL:
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

    case ERRORS_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
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

export const usersOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case OWN_ORDER_REQUEST:
    case CANCEL_ORDER_REQUEST:
      return {
        loading: true,
      };

    case OWN_ORDER_SUCCESS:
      return {
        loading: false,
        myorders: action.payload,
      };

    case CANCEL_ORDER_SUCCESS:
      const updatedOrders = state.orders.map((order) =>
        order._id === action.payload
          ? { ...order, orderStatus: 'Cancelled' }
          : order
      );

      return {
        ...state,
        loading: false,
        myorders: updatedOrders,
      };

    case OWN_ORDER_FAIL:
    case CANCEL_ORDER_FAIL:
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
