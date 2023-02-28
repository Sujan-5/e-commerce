import { CART_ADD, DELETE_ITEMS } from './cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD:
      const productItem = action.payload;

      //items exist?
      const isExist = state.cartItems.find(
        (i) => i.product === productItem.product
      );

      if (isExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isExist.product ? productItem : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, productItem],
        };
      }

    case DELETE_ITEMS:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    default:
      return state;
  }
};
