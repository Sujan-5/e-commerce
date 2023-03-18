import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import StorageIcon from '@material-ui/icons/Storage';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useParams, useNavigate } from 'react-router-dom';
import {
  errorClear,
  updateProductStock,
} from '../../../reduxFeature/actions/stockAction';
import { getadminProductDetails } from '../../../reduxFeature/actions/productAction';
import {
  STOCK_UPDATE_RESET,
  ADD_STOCK_HISTORY,
} from '../../../reduxFeature/reducers/Products/productConstants';
import StockHistory from './StockHistory';
import './addstock.css';

const AddStock = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );

  const [name, setName] = useState('');
  const [stock, setStock] = useState('');

  const productId = params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getadminProductDetails(productId));
    } else {
      setName(product.name);
      setStock(product.stock);
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(errorClear());
    }

    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (isUpdated) {
      alert.success('Stock Updated Successfully');
      navigate('/admin/products');
      dispatch({ type: STOCK_UPDATE_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const productStockSummitHandler = (e) => {
    e.preventDefault();
    const newStock = Number(stock);

    const formData = new FormData();
    formData.set('stock', newStock);

    dispatch(updateProductStock(productId, formData));

    // Update stock history
    dispatch({
      type: ADD_STOCK_HISTORY,
      payload: { quantity: newStock, date: new Date() },
    });
  };

  return (
    <Fragment>
      <div className="stockContainer">
        <h1>Add Stock</h1>
        <form onSubmit={productStockSummitHandler} className="stockForm">
          <div className="inputContainer">
            <SpellcheckIcon className="inputIcon" />
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <StorageIcon className="inputIcon" />
            <input
              type="number"
              placeholder="Stock"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="stock-history-wrapper">
        <StockHistory productId={productId} />
      </div>
    </Fragment>
  );
};

export default AddStock;
