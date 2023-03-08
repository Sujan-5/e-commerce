import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//product
import {
  createProductReducer,
  getProductDetailsReducer,
  productReducer,
  productsReducer,
} from './reduxFeature/reducers/Products/productReducer';

//category
import {
  categoryReducer,
  createCategoryReducer,
} from './reduxFeature/reducers/category/categoryReducer';

//user
import { userReducer } from './reduxFeature/reducers/Users/userReducer';
import {
  accountReducer,
  passwordForgotReducer,
} from './reduxFeature/reducers/Users/profileReducer';
import { cartReducer } from './reduxFeature/reducers/ShoppingCart/cartReducer';

const reducer = combineReducers({
  //products
  products: productsReducer,
  createProduct: createProductReducer,
  product: productReducer,
  productDetails: getProductDetailsReducer,

  //categories
  categories: categoryReducer,
  createCategory: createCategoryReducer,

  //user
  user: userReducer,
  account: accountReducer,
  forgotPassword: passwordForgotReducer,

  //cart
  cart: cartReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingDetails: localStorage.getItem('shippingDetails')
      ? JSON.parse(localStorage.getItem('shippingDetails'))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
