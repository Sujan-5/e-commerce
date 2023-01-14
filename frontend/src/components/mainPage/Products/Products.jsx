import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
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

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />{' '}
        <span>&nbsp;&nbsp; {product.numofReviews} Reviews</span>
      </div>
      <span>{`Rs. ${product.price}`}</span>
    </Link>
  );
};

export default Products;
