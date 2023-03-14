import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStockForm from './AddStock';
import StockHistory from './StockHistory';
import { useParams } from 'react-router-dom';

const StockPage = () => {
  const params = useParams();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/product/${params.id}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Current Stock: {product.stock}</p>
      <AddStockForm productId={product._id} onUpdate={fetchProduct} />
      <StockHistory product={product} />
    </div>
  );
};

export default StockPage;
