import React from 'react';
import { Box, Container, Grid } from '@mui/material';

const Products = () => {
  const renderProducts = products.map((product) => (
    <Grid>
      item key={product.id} display="flex" flexDirection={'column'}{' '}
      alignItems="center"
    </Grid>
  ));
  return (
    <Container>
      <Grid
        container
        justifyContent={'center'}
        sx={{ margin: '20px 4px 10px 4px' }}
      >
        {renderProducts}
      </Grid>
    </Container>
  );
};

export const products = [
  {
    id: 1,
    name: 'Milk',
    price: 100,
    description: 'Fresh Milk 1 litre Pack',
    image:
      'https://p.turbosquid.com/ts-thumb/Na/3xsqAt/vHb7PP8w/milky01/png/1551254532/600x600/fit_q87/ac3310e92b5cbc89991349f25809ac3bd3154217/milky01.jpg',
  },
  {
    id: 2,
    name: 'Dahi',
    price: 180,
    description: 'Classic Dahi, Cup-1 Liter',
    image:
      'https://5.imimg.com/data5/SELLER/Default/2021/1/UC/HM/YC/118764700/mother-dairy-classic-dahi-500x500.jpg',
  },
  {
    id: 3,
    name: 'Ghee',
    price: 1200,
    description: 'Fresh Ghee Bottle-1 liter',
    image:
      'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2Farchive%2F143f3f127ade44d817efbf645606142e56c66317',
  },
  {
    id: 4,
    name: 'Paneer',
    price: 850,
    description: '1 kg',
    image: '/images/Products/paneer.jpg',
  },
  {
    id: 5,
    name: 'Cheese',
    price: 1400,
    description: '1 Kg Cheese',
    image:
      'https://www.foodpackaging.guru/cheesepackaging/wp-content/uploads/sites/11/2016/01/PFM_cheese-wheel.jpg',
  },
];

export default Products;
