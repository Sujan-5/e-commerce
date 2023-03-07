import { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
  Button,
  Badge,
} from '@mui/material';
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
  ShoppingCart,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';
import Login from '@mui/icons-material/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../reduxFeature/actions/userAction';

const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Text = styled('div')`
  font-size: 16px;
  font-weight: 400;
  color: #333;
`;

const Logo = styled('div')`
  font-size: 16px;
  font-weight: 400;
  color: #333;
  background-color: transparent;
  font-weight: bold;
  font-size: clamp(0.8rem, 1.5rem, 1.9rem);
  color: primary;
`;

const theme = createTheme({
  palette: {
    neutral: {
      light: '#F3F3F3',
      main: '#CFD8DB',
      dark: '#455A61',
    },
    primary: {
      light: '#81C784',
      main: '#4CAF50',
      dark: '#388E3C',
      500: '#4CAF50',
    },
    background: {
      default: '#FFFFFF',
      alt: '#fff',
    },
  },
});

const Navbar = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading } = useSelector((state) => state.user);

  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged out SuccessFully');
  };

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  // const theme = useTheme();

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user && user.firstName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Logo
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
          onClick={() => navigate('/')}
        >
          CityWide
        </Logo>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor="#f7f8f9"
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton>
            {theme.palette.mode === { dark } ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <Badge badgeContent={`${cartItems.length}`} color="primary">
              <ShoppingCart sx={{ fontSize: '25px' }} />
            </Badge>
          </Link>

          {/* Login and Logout */}
          <FormControl variant="standard">
            {user ? (
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
                // icon={<Avatar sx={{ width: 30, height: 30 }} />}
              >
                <MenuItem value={fullName}>
                  <Text>{fullName}</Text>
                </MenuItem>
                {user && user.role !== 'admin' ? (
                  <Link
                    to="/order"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    {' '}
                    <MenuItem> My Orders</MenuItem>
                  </Link>
                ) : (
                  <Link
                    to="/admin/dashboard"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    {' '}
                    <MenuItem> DashBoard</MenuItem>
                  </Link>
                )}
                <Link
                  to="/account"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {' '}
                  <MenuItem> My Account</MenuItem>
                </Link>
                <Link
                  to="/"
                  style={{ textDecoration: 'none', color: 'red' }}
                  onClick={logoutHandler}
                >
                  <MenuItem> Logout</MenuItem>
                </Link>
              </Select>
            ) : (
              !loading && (
                <Button
                  variant="contained"
                  endIcon={<Login />}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
              )
            )}
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile  */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton sx={{ fontSize: '25px' }}>
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>

            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <ShoppingCart sx={{ fontSize: '25px' }} />
            </Link>
            <FormControl variant="standard">
              {user ? (
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: '150px',
                    borderRadius: '0.25rem',
                    p: '0.25rem 1rem',
                    '& .MuiSvgIcon-root': {
                      pr: '0.25rem',
                      width: '3rem',
                    },
                    '& .MuiSelect-select:focus': {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Text>{fullName}</Text>
                  </MenuItem>
                  {user && user.role !== 'admin' ? (
                    <Link
                      to="/order"
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      {' '}
                      <MenuItem> My Orders</MenuItem>
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      {' '}
                      <MenuItem> DashBoard</MenuItem>
                    </Link>
                  )}
                  <Link
                    to="/account"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    {' '}
                    <MenuItem> My Account</MenuItem>
                  </Link>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'red' }}
                    onClick={logoutHandler}
                  >
                    <MenuItem> Logout</MenuItem>
                  </Link>
                </Select>
              ) : (
                !loading && (
                  <Button
                    variant="contained"
                    endIcon={<Login />}
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                )
              )}
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};
export default Navbar;
