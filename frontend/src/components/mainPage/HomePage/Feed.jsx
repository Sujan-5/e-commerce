import { Box, styled } from '@mui/material';
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

  backgroundColor: '#F2F2F2',
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
  backgroundColor: '#F2F2F2',
}));

const Title = styled('div')(({ theme }) => ({
  fontWeight: 400,
  color: '#333',
  lineHeight: 1.5,
  fontSize: '70px',
  marginBottom: '20px',
  marginRight: '100px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '35px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: '#333',
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
    width: '190px',
    height: '160px',
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
    img: '/images/banner/logo.png',
    desc: 'Fresh Everyday',
  },
  {
    id: 2,
    title: 'Dahi',
    img: '/images/banner/dahi.png',
    desc: 'Fresh Everyday',
  },
  {
    id: 3,
    title: 'Ghee',
    img: '/images/banner/ghee.png',
    desc: 'Fresh Everyday',
  },
];

export default Feed;
