import { CART_ADD, DELETE_ITEMS, SHIPPING_DETAILS_SAVE } from './cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingDetails: {} },
  action
) => {
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

    case SHIPPING_DETAILS_SAVE:
      return {
        ...state,
        shippingDetails: action.payload,
      };
    default:
      return state;
  }
};
