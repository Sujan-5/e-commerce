import React from 'react';
import { styled, Box, Stack } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const SocialBox = styled(Box)({
  display: 'flex',
  gap: 10,
  color: 'white',
});

const Text = styled('div')`
  font-size: 16px;
  font-weight: 400;
  color: white;
`;

const Terms = styled('div')`
  font-size: 16px;
  font-weight: 400;
  color: white;
  align: center;
`;

const Footer = () => {
  return (
    <Box
      sx={{ background: '#202029', height: '300px' }}
      mt={5}

      // direction={{ xs: 'row', sm: 'row' }}
    >
      <Stack direction={{ xs: 'row', md: 'row' }} p={7}>
        <Box flex={2}>
          <Text>Contact Us</Text>
          <Text>Contact Us</Text>
          <Text>Contact Us</Text>
          <Text>Contact Us</Text>
        </Box>
        <Box flex={2}>
          <Text>Data Policy</Text>
          <Text>Data Safty</Text>
          <Text>Email</Text>
        </Box>
        <Box>
          <Text>Follow Us</Text>
          <SocialBox>
            <Facebook />
            <Instagram />
            <Twitter />
          </SocialBox>
        </Box>
      </Stack>
      <hr />
      <Terms variant={'body2'}>
        &copy;{new Date().getFullYear()} Citywide | All right reserved | Terms
        of Service | Privacy
      </Terms>
    </Box>
  );
};

export default Footer;
