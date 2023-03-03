import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNavigation = ({ title }) => {
  const styles = {
    wrapper: {
      height: '4rem',
      // backgroundColor: '#ECEFF3',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: '1.2rem',
      paddingLeft: '1.2rem',
    },
    link: {
      fontSize: '1.2rem',
      color: 'black',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.wrapper}>
      <NavLink to="/" style={styles.link}>
        Home
      </NavLink>
      /{title}
    </div>
  );
};

export default PageNavigation;