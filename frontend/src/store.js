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
});

let initialState = {
  //products
  products: [],
  createProduct: { success: false },
  product: {},
  productDetails: { product: {} },

  //categories
  categories: [],
  createCategory: { success: false },

  //user
  user: { user: {} },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
