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
  categoryUDReducer,
  createCategoryReducer,
  getCategoryDetailsReducer,
} from './reduxFeature/reducers/category/categoryReducer';

//user
import {
  userDetailsReducer,
  userReducer,
  usersListReducer,
} from './reduxFeature/reducers/Users/userReducer';
import {
  accountReducer,
  passwordForgotReducer,
} from './reduxFeature/reducers/Users/profileReducer';
import { cartReducer } from './reduxFeature/reducers/ShoppingCart/cartReducer';
import {
  allReviewsReducer,
  reviewReducer,
  writeReviewReducer,
} from './reduxFeature/reducers/Review/reviewReducer';
import { productStockReducer } from './reduxFeature/reducers/Products/stockReducer';
import {
  adminOrdersReducer,
  usersOrdersReducer,
  orderDetailsReducer,
  updateOrdersReducer,
} from './reduxFeature/reducers/Orders/orderReducer';

const reducer = combineReducers({
  //products
  products: productsReducer,
  createProduct: createProductReducer,
  product: productReducer,
  productDetails: getProductDetailsReducer,
  stock: productStockReducer,

  //orders
  orders: adminOrdersReducer,
  order: updateOrdersReducer,
  orderDetails: orderDetailsReducer,
  myOrders: usersOrdersReducer,

  //categories
  categories: categoryReducer,
  createCategory: createCategoryReducer,
  categoryDetails: getCategoryDetailsReducer,
  category: categoryUDReducer,

  //user
  user: userReducer,
  account: accountReducer,
  forgotPassword: passwordForgotReducer,
  userList: usersListReducer,
  userDetails: userDetailsReducer,

  //cart
  cart: cartReducer,

  //review
  review: writeReviewReducer,
  allreviews: allReviewsReducer,
  deleteReview: reviewReducer,
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
