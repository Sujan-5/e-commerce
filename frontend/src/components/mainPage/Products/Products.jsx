import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './product.css';

const options = {
  edit: false,
  color: 'rgbs(20,20,20,0.1)',
  activeColor: 'tomato',
  size: window.innerWidth < 600 ? 20 : 25,
  value: 2.5,
  isHalf: true,
};

const Products = () => {
  return (
    <Link className="productCard" to={products._id}>
      <img src={products.image[0].url} alt={products.name} />
      <p>{products.name}</p>
      <div>
        <ReactStars {...options} /> <span>(2 reviews)</span>
      </div>
      <span>{products.price}</span>
    </Link>
  );
};

export const products = {
  _id: 1,
  name: 'Milk',
  price: 'Rs. 100',
  image: [
    {
      url: 'https://p.turbosquid.com/ts-thumb/Na/3xsqAt/vHb7PP8w/milky01/png/1551254532/600x600/fit_q87/ac3310e92b5cbc89991349f25809ac3bd3154217/milky01.jpg',
    },
  ],

  // {
  //   id: 2,
  //   name: 'Dahi',
  //   price: 180,

  //   image:
  //     'https://5.imimg.com/data5/SELLER/Default/2021/1/UC/HM/YC/118764700/mother-dairy-classic-dahi-500x500.jpg',
  // },
  // {
  //   id: 3,
  //   name: 'Ghee',
  //   price: 1200,

  //   image:
  //     'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2Farchive%2F143f3f127ade44d817efbf645606142e56c66317',
  // },
  // {
  //   id: 4,
  //   name: 'Paneer',
  //   price: 850,

  //   image: '/images/Products/paneer.jpg',
  // },
  // {
  //   id: 5,
  //   name: 'Cheese',
  //   price: 1400,

  //   image:
  //     'https://www.foodpackaging.guru/cheesepackaging/wp-content/uploads/sites/11/2016/01/PFM_cheese-wheel.jpg',
  // },
};

export default Products;
