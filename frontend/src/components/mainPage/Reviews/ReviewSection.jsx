import React from 'react';
import { Rating } from '@mui/material';
import './reviewSection.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ReviewSection = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewSec">
      <div className="avatar">
        <AccountCircleIcon className="img" />
        <p className="reviewName">{review.firstName}</p>
      </div>
      <Rating {...options} className="rating" />
      <span className="reviewComment">{review.comment}</span>
    </div>
  );
};

export default ReviewSection;
