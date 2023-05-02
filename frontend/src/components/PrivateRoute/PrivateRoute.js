import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAlert } from 'react-alert';

const PrivateRoute = ({ children, isAdmin }) => {
  const navigate = useNavigate();
  const alert = useAlert();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  if (user?.role !== 'admin' && isAdmin) {
    alert.error('Only Admin Can Access This Resource');
    return navigate('/');
  }

  if (isAdmin && user?.role === 'admin') {
    return children ? children : <Outlet />;
  }

  return null;
};

export default PrivateRoute;
