import React from 'react';
import { Fragment } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
      {!loading && (
        <Outlet
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              navigate('/login');
            }
            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default PrivateRoute;
