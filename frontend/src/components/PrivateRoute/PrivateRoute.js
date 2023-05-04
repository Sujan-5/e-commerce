import { useNavigate, Outlet } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';

const PrivateRoute = ({ children, isAdmin, user, isAuthenticated }) => {
  const navigate = useNavigate();
  const alert = useAlert();

  console.log(user, isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === false) {
      return navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (isAdmin === true && user?.role !== 'admin') {
    alert.error('Only Admin Can Access This Resource');
    return navigate('/');
  }
  console.log(user.role);

  return children ? children : <Outlet />;
};

export default PrivateRoute;
