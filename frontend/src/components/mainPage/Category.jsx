import React from 'react';
import {
  Box,
  styled,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';

const Categories = styled(Box)(({ theme }) => ({
  padding: '2px 8px',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'centre',
  },
}));

const Category = () => {
  return (
    <Categories flex={4} p={2}>
      <ImageList variant="quilted" sx={{ width: 500, height: 450 }} cols={3}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&h=248&fit=crop&auto=format&dpr=2`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar title={item.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </Categories>
  );
};
const itemData = [
  {
    title: 'Milk',
    img: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Dahi',
    img: 'https://nanakfoods.com/files/product-photo-gallery/dahi-368.png',
  },
  {
    title: 'Ghee',
    img: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2Farchive%2F143f3f127ade44d817efbf645606142e56c66317',
  },
];

export default Category;
