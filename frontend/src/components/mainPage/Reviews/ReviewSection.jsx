import React from 'react';
import Rating from '@mui/material/Rating';
import './reviewSection.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ReviewSection = ({ review }) => {
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tamato',
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="reviewSec">
      <AccountCircleIcon className="img" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewComment">{review.comment}</span>
    </div>
  );
};

export default ReviewSection;
