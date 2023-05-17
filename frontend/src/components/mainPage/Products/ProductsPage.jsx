import React, { Fragment, useEffect, useState } from 'react';
import './productPage.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  errorClear,
  getProduct,
} from '../../../reduxFeature/actions/productAction';
import Loader from '../FrontFeatures/Loading/Loader';
import Product from './Productcard';
import Slider from '@material-ui/core/Slider';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';

export const ProductsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2000]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    e.preventDefault();

    setPrice(newPrice);
  };

  const { loading, products, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const keyword = params.search;

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price));
  }, [dispatch, keyword, price, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="wrapper">
            {/* <PageNavigation title={product.name} /> */}
          </div>
          <h2 className="productsHeading">Products</h2>
          <div className="productContainer">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <h3>Price</h3>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={2000}
            />
          </div>

          {resPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="⟩"
                prevPageText="⟨"
                firstPageText="«"
                lastPageText="»	"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
