import React from 'react';
import { Link } from 'react-router-dom';
import './category.css';

const Category = ({ category }) => {
  const defaultImage = 'https://via.placeholder.com/250x250';

  return (
    <Link className="categoryCard" to={`/category/${category.title}`}>
      {category.image && category.image.length > 0 ? (
        <img src={category.image[0]?.url} alt={category.title} />
      ) : (
        <img src={defaultImage} alt={category.title} />
      )}
      <p>{category.title}</p>
      <div className="shopNowBtn">Shop Now</div>
    </Link>
  );
};

export default Category;
