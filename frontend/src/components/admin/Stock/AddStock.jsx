import React, { useState } from 'react';
import axios from 'axios';

const AddStock = ({ productId, onUpdate }) => {
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/admin/${productId}/stock`, { stock });
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Add Stock:
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddStock;
