import React, { Fragment } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './success.css';
import { Link } from 'react-router-dom';
import MultiSteps from '../ShippingAndChekout/MultiSteps';

const Success = () => {
  return (
    <Fragment>
      {' '}
      <MultiSteps activeStep={2} />
      <div className="successOrder">
        <CheckCircleIcon />
        <p>Your order has been placed successfully</p>
        <Link to="/orders" style={{ textDecoration: 'none' }}>
          <button>View Orders</button>
        </Link>
      </div>
    </Fragment>
  );
};

export default Success;
