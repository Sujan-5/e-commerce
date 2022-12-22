import { Box, styled, Typography, Slide } from '@mui/material';
import { useState, useEffect } from 'react';

const Promotion = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    padding: '15px 0px 15px 0px',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0px 10px 0px',
  overflow: 'hidden',
  backgroundColor: 'lightblue',
}));

const MessagePromo = styled(Typography)(({ theme }) => ({
  fontFamily: 'Verdana',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
  fontSize: '1rem',
  color: 'black',
}));

const messages = [
  '15% off on your first order!',
  'Fresh, Local, Delivered',
  'Inside Valley Only!!',
];

const Promotions = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);

    const intervalId = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }, 4000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Promotion>
      <Slide direction={show ? 'left' : 'right'} in={show}>
        <Box display={'flex'} justifyContent="center" alightItems={'center'}>
          <MessagePromo>{messages[messageIndex]}</MessagePromo>
        </Box>
      </Slide>
    </Promotion>
  );
};
export default Promotions;
