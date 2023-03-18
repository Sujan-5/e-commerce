import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import './Stockhistory.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const StockHistory = () => {
  const { product } = useSelector((state) => state.productDetails);

  return (
    <div className="stock-history-container">
      <h2 className="stock-history-heading">Stock History</h2>
      {product &&
      product.stock_history &&
      product.stock_history.length === 0 ? (
        <p className="stock-history-message">
          No stock history for this product.
        </p>
      ) : (
        <table className="stock-history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.stock_history &&
              product.stock_history.map((historyItem, index) => {
                const date = moment(historyItem.date);
                const formattedDate = date.format('MMM D, YYYY');
                return (
                  <tr
                    key={historyItem.date}
                    className={
                      index % 2 === 0
                        ? 'stock-history-row-even'
                        : 'stock-history-row-odd'
                    }
                  >
                    <td>
                      <span className="stock-history-date">
                        {formattedDate}
                      </span>
                    </td>
                    <td className="stock-history-quantity">
                      {historyItem.quantity}
                    </td>
                    <td>
                      <button
                        // onClick={() => handleDelete(historyItem.date)}
                        className="delete-button"
                      >
                        <DeleteOutlineIcon sx={{ color: 'red' }} />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockHistory;
