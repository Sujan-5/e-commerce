import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import LeftSidebar from '../LeftSidebar';
import { useAlert } from 'react-alert';
import {
  allOrderDetails,
  errorClear,
} from '../../../reduxFeature/actions/OrderAction';
import { ORDER_UPDATE_RESET } from '../../../reduxFeature/reducers/Orders/orderConstants';

const UpdateOrder = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const alert = useAlert();
  const [status, setStatus] = useState('');

  const { order, error } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const orderUpdateHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.set('status', status);
  };

  const userName = `${order && order.firstName}`;
  const userContact = `${order && order.contact}`;
  const userAddress = `${order && order.address} ${order && order.city} ${
    order && order.province
  }`;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(errorClear());
    }
    if (isUpdated) {
      alert.success('Order Updated Successfully');
      dispatch({ type: ORDER_UPDATE_RESET });
    }

    dispatch(allOrderDetails(params.id));
  }, [dispatch, alert, error, params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <div className="orderContainer">
        {/* <LeftSidebar /> */}
        <div>
          <div className="orderDetails">
            <div className="orderDetailsBox">
              <div>
                <p>Name: </p>
                <span>{userName}</span>
              </div>
              <div>
                <p>Contact: </p>
                <span>{userContact}</span>
              </div>
              <div>
                <p>Address: </p>
                <span>{userAddress}</span>
              </div>
            </div>
          </div>
          <div className="orderCartDetails">
            <h1>Cart Items</h1>
            <div className="orderCartItems">
              {order.orderItems &&
                order.orderItems.map((item) => (
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
              <div
                style={{
                  display: order.orderStatus === 'Delivered' ? 'none' : 'block',
                }}
              >
                <form className="orderForm" onSubmit={orderUpdateHandler}>
                  <div>
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose</option>
                    </select>
                  </div>
                </form>
              </div>
              <button>Update</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateOrder;
