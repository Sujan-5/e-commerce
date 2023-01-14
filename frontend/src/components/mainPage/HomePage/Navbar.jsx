import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Link,
} from '@mui/material';
import {
  LocationCity,
  ShoppingCart,
  DarkMode,
  WbSunny,
} from '@mui/icons-material';
import React from 'react';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#98AFC7',
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: '#DADBDD',
  padding: '0 12px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
}));

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  color: 'black',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const Dark = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  color: 'black',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Link to="/home" sx={{ textDecoration: 'none' }}>
          <Typography
            variant="h6"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            color={'black'}
          >
            City<b style={{ color: 'red' }}>Wide</b>
            {/* <img src="/images/banner/logo.png" alt='logo' /> */}
          </Typography>
        </Link>
        <LocationCity sx={{ display: { xs: 'block', sm: 'none' } }} />

        <Search>
          <SearchIcon style={{ color: 'black' }} />
          <InputBase
            placeholder="   search..."
            sx={{ input: { color: 'black' } }}
          />
        </Search>
        <Dark>
          <WbSunny style={{ color: '#FFAE42' }} />
          <Switch style={{ color: 'black' }} />
          <DarkMode />
        </Dark>
        <Icons>
          <Badge>
            <ShoppingCart />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
        </Icons>

        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
