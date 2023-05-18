import React, { Fragment, useEffect, useState } from 'react';
import './productPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../../reduxFeature/actions/productAction';
import Loader from '../FrontFeatures/Loading/Loader';
import Product from './Productcard';
import Slider from '@material-ui/core/Slider';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';

export const ProductsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);
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

  const { categories } = useSelector((state) => state.categories);

  const keyword = params.search;

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, price, currentPage, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="wrapper"></div>
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
            <h3>Categories</h3>
            <ul className="categoryfilter">
              {categories &&
                categories.map((category) => (
                  <li
                    className="category-li "
                    key={category.title}
                    onClick={() => setCategory(category)}
                  >
                    {category.title}
                  </li>
                ))}
            </ul>

            <h3 component="legend">Ratings Above</h3>
            <Rating
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              precision={0.5}
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
