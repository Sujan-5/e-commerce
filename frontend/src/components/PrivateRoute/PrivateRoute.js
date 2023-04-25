import React from 'react';

import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, isAdmin, isAuthenticated, children }) => {
  if (user && user.role === 'admin' && !isAdmin) {
    return <Navigate to={'/'} />;
  }
  if (isAuthenticated === false) {
    <Navigate to={'/login'} />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
