import React from 'react';
import { styled, Box, Stack } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const SocialBox = styled(Box)({
  display: 'flex',
  gap: 10,
  color: 'white',
});

const Text = styled('div')`
  font-size: 12px;
  font-weight: 400;
  color: white;
`;

const Terms = styled('div')`
  font-size: 12px;
  font-weight: 400;
  color: white;
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  line-height: 1.5;
`;

const FooterContainer = styled(Box)`
  background-color: #202029;
  color: white;
  padding: 30px 0;
`;

const FooterContent = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          p={5}
        >
          <Box flex={1}>
            <Text>Contact Us</Text>
            <Text>Narayantar, Near East Pole School</Text>
            <Text>Jorpati, kathmandu</Text>
            <Text>9800000000</Text>
          </Box>
          <Box flex={1}>
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
        {/* <hr style={{ borderTop: '1px solid white', margin: '20px 0' }} /> */}
        <Terms>
          &copy;{new Date().getFullYear()} Citywide | All right reserved | Terms
          of Service | Privacy
        </Terms>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
