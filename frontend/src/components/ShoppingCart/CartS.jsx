import React, { Fragment } from 'react';
import './cart.css';
import { useNavigate, Link } from 'react-router-dom';
import ProductCart from './ProductCart';
import { useDispatch, useSelector } from 'react-redux';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import {
  addToCart,
  deleteFromCart,
} from '../../reduxFeature/actions/cartAction';
import { useAlert } from 'react-alert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const CartS = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      alert.error('No Product in stock');
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(deleteFromCart(id));
  };

  const checkOutHandler = () => {
    if (user) {
      navigate('/shipping');
    } else {
      alert.error('Please Login to access this resouces');
      navigate('/login');
    }
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="noItemInCart">
          <RemoveShoppingCartIcon />

          <p>No Product in Your Cart</p>
          <Link to="/home">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="top">
            <Link to="/">
              <button className="shopbutton">More Shopping</button>
            </Link>
            <button className="checkOut">CheckOut</button>
          </div>
          <div className="cartContainer">
            <div className="cartheading">
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartshop" key={item.product}>
                  <ProductCart item={item} deleteCartItems={deleteCartItems} />
                  <div className="addDelete">
                    <button
                      onClick={() => decreaseQty(item.product, item.quantity)}
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQty(item.product, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartsubtotal">
                    {`Rs${item.quantity * item.price}`}{' '}
                  </p>
                  <p
                    onClick={() => deleteCartItems(item.product)}
                    className="cartdeleteButton"
                  >
                    <DeleteOutlineIcon sx={{ color: 'red', width: '50px' }} />
                  </p>
                </div>
              ))}

            <div className="cartTotalGross">
              <div></div>
              <div className="cartTotalGrossBox">
                <p>Gross Total</p>
                <p>{`Rs.${cartItems.reduce(
                  (tot, item) => tot + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>

              <div className="checkoutBTN">
                <button onClick={checkOutHandler}>CheckOut</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
