import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import Pagination from '@mui/material/Pagination';

import './product.css';

const Products = ({ product }) => {
  const options = {
    edit: false,
    color: 'rgbs(20,20,20,0.1)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const defaultImage = 'https://via.placeholder.com/250x250';

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      {/* <img src={product.images[0].url} alt={product.name} /> */}
      {product.images && product.images.length > 0 ? (
        <img src={product.images[0].url} alt={product.name} />
      ) : (
        <img src={defaultImage} alt={product.name} />
      )}
      <p>{product.name}</p>
      <span>{`Rs. ${product.price}`}</span>
      <div>
        <ReactStars {...options} />{' '}
        <span>&nbsp;&nbsp; {product.numofReviews} Reviews</span>
      </div>
    </Link>
  );
};

export default Products;
