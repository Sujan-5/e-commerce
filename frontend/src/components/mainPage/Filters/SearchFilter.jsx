import React, { Fragment, useEffect, useState } from 'react';

import Productcard from '../Products/Productcard';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const SearchFilter = () => {
  const params = useParams();
  const keyword = params.search;
  const [productList, setProductList] = useState();

  useEffect(() => {
    const getSearch = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/products?keyword=${keyword}`
        );
        console.log(data.products);
        setProductList(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getSearch();
  }, [keyword]);

  return (
    <Fragment>
      <div>
        <h2 className="productsHeading">Products</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '0 5vmax',
            justifyContent: 'center',
            minHeight: '30vh',
          }}
        >
          {productList &&
            productList.map((product) => (
              <Productcard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default SearchFilter;
