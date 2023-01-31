import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createProductReducer,
  getProductDetailsReducer,
  productReducer,
  productsReducer,
} from './reduxFeature/reducers/Products/productReducer';

const reducer = combineReducers({
  products: productsReducer,
  createProduct: createProductReducer,
  product: productReducer,
  productDetails: getProductDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
