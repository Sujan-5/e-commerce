import React from 'react';
import { Box, styled, Stack, Typography } from '@mui/material';
import milkImage from '../../../displayProductImages/milk.jpg';
import fruits from '../../../displayProductImages/fruits.jpg';
import snacks from '../../../displayProductImages/snacks.jpg';

const StyledBox = styled(Box)({
  height: 200,
  width: '100%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  transition: 'transform .2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const StyledTypography = styled(Typography)({
  margin: '20% 50px 25% 50px',
  background: 'white',
  opacity: '0.8',
  borderRadius: 20,
  padding: '10px 20px',
});
const Category = () => {
  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
        height={{ xs: '10%', sm: '100%' }}
        width={{ xs: '100%', sm: '100%' }}
        sx={{ display: 'flex' }}
        mt={1}
      >
        <StyledBox sx={{ backgroundImage: `url(${milkImage})` }}>
          <StyledTypography align="center" variant="h4">
            Milk
          </StyledTypography>
        </StyledBox>
        <StyledBox sx={{ backgroundImage: `url(${fruits})` }}>
          <StyledTypography align="center" variant="h4">
            Fruits
          </StyledTypography>
        </StyledBox>
        <StyledBox sx={{ backgroundImage: `url(${snacks})` }}>
          <StyledTypography align="center" variant="h4">
            Snacks
          </StyledTypography>
        </StyledBox>
      </Stack>
    </Box>
  );
};

export default Category;
