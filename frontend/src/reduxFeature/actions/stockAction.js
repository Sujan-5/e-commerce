import axios from 'axios';
import {
  STOCK_UPDATE_SUCCESS,
  STOCK_UPDATE_FAIL,
  ERRORS_CLEAR,
  ADD_STOCK_HISTORY,
} from '../reducers/Products/productConstants';

export const updateProductStock =
  (productId, stock, stockHistory) => async (dispatch) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const response = await axios.put(
        `/api/v1/stock/${productId}`,
        JSON.stringify(stock),
        config
      );

      const data = await response.json();

      dispatch({
        type: STOCK_UPDATE_SUCCESS,
        payload: data.success,
      });

      dispatch({
        type: ADD_STOCK_HISTORY,
        payload: { stock, stockHistory },
      });
    } catch (error) {
      dispatch({
        type: STOCK_UPDATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const errorClear = () => async (dispatch) => {
  dispatch({
    type: ERRORS_CLEAR,
  });
};
