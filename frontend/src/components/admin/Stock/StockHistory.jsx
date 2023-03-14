import React from 'react';

const StockHistory = ({ product }) => {
  return (
    <div>
      <h2>Stock History</h2>
      <ul>
        {product.stock_history.map((item) => (
          <li key={item.date}>
            +{item.quantity} ({new Date(item.date).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockHistory;
