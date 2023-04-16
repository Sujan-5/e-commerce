import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import StorageIcon from '@material-ui/icons/Storage';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateProductStock } from '../../../reduxFeature/actions/stockAction';
import { getadminProductDetails } from '../../../reduxFeature/actions/productAction';
import StockHistory from './StockHistory';
import './addstock.css';
import { LeftSidebar } from '../LeftSidebar';

const AddStock = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { product } = useSelector((state) => state.productDetails);

  const [stock, setStock] = useState('');

  const productId = params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getadminProductDetails(productId));
    } else {
      setStock(product.stock);
    }
  }, [dispatch, productId, product]);

  const productStockSummitHandler = (e) => {
    e.preventDefault();
    const newStock = Number(stock);

    const stockData = { stock: newStock };

    dispatch(updateProductStock(productId, stockData));
    dispatch(getadminProductDetails(productId));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <LeftSidebar />
        <div>
          <div className="stockContainer">
            <h1>Add Stock</h1>
            <form onSubmit={productStockSummitHandler} className="stockForm">
              <div className="inputContainer">
                <StorageIcon className="inputIcon" />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <button type="submit">Add Stock</button>
            </form>
          </div>
          <div className="stock-history-wrapper">
            <StockHistory productId={productId} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddStock;
