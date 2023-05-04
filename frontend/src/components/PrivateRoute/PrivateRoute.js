import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';

const PrivateRoute = ({ children, isAdmin }) => {
  const navigate = useNavigate();
  const alert = useAlert();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  // console.log(state.user);

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
