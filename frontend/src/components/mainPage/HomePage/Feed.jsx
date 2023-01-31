import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Banner = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '98.9 %',
  height: '100%',
  padding: '2px 8px',

  backgroundColor: '#D3D3D3',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

const BannerContent = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'centre',
  flexDirection: 'column',
  padding: '30px',
  maxWidth: '420',
}));

const Title = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  fontSize: '70px',
  marginBottom: '20px',
  marginRight: '100px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '35px',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: '1.5em',
  },
}));

const Image = styled('img')(({ src, theme }) => ({
  flex: 1,
  src: `url(${src})`,
  width: '100%',
  height: '50vh',
  objectFit: 'contain',
  [theme.breakpoints.down('md')]: {
    width: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '200px',
    height: '180px',
  },
}));

const Wrapper = styled('div')`
  display: flex;
  justifycontent: center;
`;

const Feed = () => {
  return (
    <Banner>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Thumbs, Autoplay]}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        effect={'slide'}
        sx={{ display: 'flex' }}
      >
        {sliderItems.map((product) => (
          <SwiperSlide key={product.id}>
            <Wrapper>
              <Image src={product.img} />
              <BannerContent>
                <Typography fontSize={{ xs: '9px', sm: '18px' }}>
                  Fresh, Local, Delivered
                </Typography>
                <Title variant="h2">{product.title}</Title>
                <Description fontSize={{ xs: '9px', sm: '18px' }}>
                  {product.desc}
                </Description>
              </BannerContent>
            </Wrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </Banner>
  );
};

const sliderItems = [
  {
    id: 1,
    title: 'Milk',
    img: '/images/banner/milkB.png',
    desc: 'Fresh Everyday',
  },
  {
    id: 2,
    title: 'Dahi',
    img: '/images/dahi1.jpg',
    desc: 'Fresh Everyday',
  },
  {
    id: 3,
    title: 'Ghee',
    img: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2Farchive%2F143f3f127ade44d817efbf645606142e56c66317',
    desc: 'Fresh Everyday',
  },
];

export default Feed;
