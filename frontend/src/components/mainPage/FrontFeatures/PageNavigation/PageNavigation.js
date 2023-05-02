import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const PageNavigation = ({ title, category }) => {
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
      color: '#1a9cb7',
      textDecoration: 'none',
    },
  };

  return (
    // <div style={styles.wrapper}>
    //   <NavLink to="/" style={styles.link}>
    //     Home&nbsp;
    //   </NavLink>{' '}
    //   {'>'} {title}
    // </div>
    <div style={styles.wrapper}>
      <NavLink to="/" style={styles.link}>
        Home&nbsp;
      </NavLink>
      {category && (
        <>
          {' > '}
          <NavLink to={`/${category}`} style={styles.link}>
            {category}
          </NavLink>
        </>
      )}
      {' > '}
      {title}
    </div>
  );
};

export default PageNavigation;
