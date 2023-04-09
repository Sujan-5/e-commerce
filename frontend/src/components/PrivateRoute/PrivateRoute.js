import React from 'react';

import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, isAdmin, isAuthenticated, children }) => {
  if (isAuthenticated === false) {
    <Navigate to={'/login'} />;
  }
  if (user && user.role === 'admin' && !isAdmin) {
    return <Navigate to={'/'} />;
  }
  return children ? children : <Outlet />;
};

export default PrivateRoute;
