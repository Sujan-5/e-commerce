import React from 'react';
import { Link } from 'react-router-dom';

import './product.css';

const Products = ({ category }) => {
  const defaultImage = 'https://via.placeholder.com/250x250';

  return (
    <Link className="productCard" to={`/product/${category._id}`}>
      {category.images && category.images.length > 0 ? (
        <img src={category.images[0]?.url} alt={category.title} />
      ) : (
        <img src={defaultImage} alt={category.title} />
      )}
      <p>{category.title}</p>
    </Link>
  );
};

export default Products;
