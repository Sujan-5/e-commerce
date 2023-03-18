import React, { Fragment } from 'react';
import './orderDetails.css';
import MultiSteps from './MultiSteps';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
  const { shippingDetails, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const allTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const units = cartItems.quantity;

  const shippingCharges = allTotal > 2000 ? 0 : 50;

  const totalPrice = allTotal + shippingCharges;

  const fullAddress = `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.province}`;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Fragment>
      <MultiSteps activeStep={1} />
      <div className="orderContainer">
        <div>
          <div className="userShippingDetails">
            <h1>{user.firstName}'s Shipping Details</h1>
            <div className="shippingDetailsBox">
              <div>
                <p>Name: </p>
                <span>{fullName}</span>
              </div>
              <div>
                <p>Contact: </p>
                <span>{shippingDetails.contact}</span>
              </div>
              <div>
                <p>Address: </p>
                <span>{fullAddress}</span>
                <Link to="/shipping" style={{ textDecoration: 'none' }}>
                  <button>Edit</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="cartDetailsContainer">
            <h1>Cart Items</h1>
            <div className="cartItems">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link
                      to={`/product/${item.product}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {item.name}
                    </Link>
                    <span>
                      {item.quantity} X Rs. {item.price} ={' '}
                      <b>Rs. {item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="wholeSummary">
            <h1>Order Summary</h1>
            <div className="wholeSummaryBox">
              <div>
                <p>Total Units:</p>
                <span>{units}</span>
              </div>
              <div>
                <p>Total: </p>
                <span>Rs. {allTotal}</span>
              </div>
              <div>
                <p>Shipping Charges: </p>
                <span>Rs. {shippingCharges}</span>
              </div>
              <div>
                <p>All Total: </p>
                <span>Rs. {totalPrice}</span>
              </div>
              <button>Proceed To Payment</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;