import { Box, styled, Typography } from '@mui/material';
import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { StaticImage } from 'gatsby-plugin-image';

const Banner = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 3,
  width: '100%',
  height: '100%',
  padding: '2px 8px',

  backgroundColor: 'lightgray',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'centre',
  },
}));

const BannerContent = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'centre',
  flexDirection: 'column',
  padding: '30px',
  maxWidth: '420',
}));

const BannerTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  fontSize: '70px',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '42px',
  },
}));

const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: '1.5em',
  },
}));

const BannerImage = styled('img')(({ src, theme }) => ({
  src: `url(${src})`,
  width: '350px',
  [theme.breakpoints.down('md')]: {
    width: '350px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '320px',
    height: '300px',
  },
}));

const Feed = () => {
  return (
    <Banner>
      <BannerImage src="/images/banner/milkB.png" />
      <BannerContent>
        <Typography variant="h6">Fresh, Local, Delivered</Typography>
        <BannerTitle variant="h2">Milk</BannerTitle>
        <BannerDescription variant="subtitle">Fresh Everyday</BannerDescription>
      </BannerContent>
    </Banner>
    // <div>
    //   <Swiper
    //     spaceBetween={50}
    //     slidesPerView={3}
    //     onSlideChange={() => console.log('slide change')}
    //     onSwiper={(swiper) => console.log(swiper)}
    //   >
    //     <SwiperSlide>
    //       <div className="image">
    //         <StaticImage src="./images/paneer"></StaticImage>
    //       </div>
    //     </SwiperSlide>
    //     <SwiperSlide>Slide 2</SwiperSlide>
    //     <SwiperSlide>Slide 3</SwiperSlide>
    //     <SwiperSlide>Slide 4</SwiperSlide>
    //     ...
    //   </Swiper>
    // </div>
  );
};

export default Feed;
