import React from 'react';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './cart.css';

const ProductCart = ({ item, deleteCartItems }) => {
  return (
    <div className="bottom">
      <img className="productimage" src={item?.image} alt="ssa" />
      <div className="productCartdetails">
        <Link tp={`/product/${item.product}`} className="productName">
          {item.name}
        </Link>
        <span className="productPrice">{`Price: Rs${item.price}`}</span>
        <p
          onClick={() => deleteCartItems(item.product)}
          className="cartdeleteButton"
        >
          <DeleteOutlineIcon sx={{ color: 'red', width: '50px' }} />
        </p>
      </div>
    </div>
  );
};

export default ProductCart;

{
  /* <div className="priceDetails">
        <div className="productAmount">
          <button onClick={() => decreaseQuantity(item.product, item.quantity)}>
            -
          </button>
          <input className="productAmount" type="number" readOnly />
          <button
            onClick={() =>
              increaseQuantity(item.product, item.quantity, item.stock)
            }
          >
            +
          </button>
        </div> */
}
