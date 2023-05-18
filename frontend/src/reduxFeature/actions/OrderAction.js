import axios from 'axios';
import {
  //all order
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_ALL_FAIL,

  //update order
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
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

  //cancel order
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
} from '../reducers/Orders/orderConstants';

export const allOrdersAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_ALL_REQUEST });

    const { data } = await axios.get('/api/ord/admin/allorders');

    dispatch({ type: ORDER_ALL_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ORDER_ALL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateOrdersAdmin = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_UPDATE_REQUEST });

    const env = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.put(`/api/ord/admin/order/${id}`, order, env);

    dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// export const deleteOrdersAdmin = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ORDER_DELETE_REQUEST });

//     const { data } = await axios.delete(`/api/ord/admin/order/${id}`);

//     dispatch({ type: ORDER_DELETE_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: ORDER_DELETE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Get Order Details
export const allOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/ord/order/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: OWN_ORDER_REQUEST });

    const { data } = await axios.get('/api/ord/orders/me');

    dispatch({ type: OWN_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: OWN_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST });

    await axios.post(`/api/ord/order/cancel/${orderId}`);

    dispatch({ type: CANCEL_ORDER_SUCCESS, payload: orderId });
    window.location.reload(false);
  } catch (error) {
    console.log(error);
    dispatch({
      type: CANCEL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const errorClear = () => async (dispatch) => {
  dispatch({
    type: ERRORS_CLEAR,
  });
};
