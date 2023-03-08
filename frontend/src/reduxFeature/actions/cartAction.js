import {
  CART_ADD,
  DELETE_ITEMS,
  SHIPPING_DETAILS_SAVE,
} from '../reducers/ShoppingCart/cartConstants';
import axios from 'axios';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: CART_ADD,
    payload: {
      product: data.product._id,
      name: data.product.name,
      stock: data.product.stock,
      price: data.product.price,
      image: data.product.images[0]?.url,
      quantity,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//deleting from cart
export const deleteFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_ITEMS,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// saving shipping info
export const saveShippingDetails = (data) => async (dispatch) => {
  dispatch({
    type: SHIPPING_DETAILS_SAVE,
    payload: data,
  });

  localStorage.setItem('shippingDetails', JSON.stringify(data));
};
