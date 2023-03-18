import {
  STOCK_UPDATE_SUCCESS,
  STOCK_UPDATE_FAIL,
  ERRORS_CLEAR,
  ADD_STOCK_HISTORY,
} from './productConstants';

const initialState = {
  product: {
    stock_history: [],
  },
  error: null,
};

export const productStockReducer = (state = initialState, action) => {
  switch (action.type) {
    case STOCK_UPDATE_SUCCESS:
      return { product: action.payload, error: '' };

    case STOCK_UPDATE_FAIL:
      return { product: null, error: action.payload };

    case ADD_STOCK_HISTORY:
      const { stock, stockHistory } = action.payload;
      const updatedProduct = {
        ...state.product,
        stock,
        stock_history: [...state.product.stock_history, stockHistory],
      };
      return {
        ...state,
        product: updatedProduct,
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
