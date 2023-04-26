import React from 'react';
import { useAlert } from 'react-alert';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, isAdmin, isAuthenticated, children }) => {
  const alert = useAlert();

  if (user && user.role === 'admin' && !isAdmin) {
    alert.error('Only Admin Can Access This Resource');
    return <Navigate to={'/'} />;
  }
  if (isAuthenticated === false) {
    return <Navigate to={'/login'} />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
