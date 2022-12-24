// import { Route, Routes, Navigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Main from './components/Main';
// // import EmailVerify from './components/EmailVerify';
// import ForgotPassword from './components/ForgotPassword';
// import OtpForm from './components/Signup/OtpForm';
import Navbar from './components/mainPage/Navbar';
import Feed from './components/mainPage/Feed';
import { Box, Stack } from '@mui/material';
import Promotions from './components/mainPage/Promotions';
import Category from './components/mainPage/Category';

function App() {
  // const user = localStorage.getItem('token');
  return (
    // <Routes>
    //   {user && <Route path="/" exact element={<Main />} />}
    //   <Route path="/signup" exact element={<Signup />} />
    //   <Route path="/login" exact element={<Login />} />
    //   <Route path="/" exact element={<Navigate replace to="/login" />} />

    //   <Route path="/otpform" exact element={<OtpForm />} />
    // <Route path="/Navbar" exact element={<Navbar />} />
    //   <Route path="/forgot-password" element={<ForgotPassword />} />
    // </Routes>

    <Box>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Feed />
      </Stack>
      <Promotions />
      <Category />
    </Box>
  );
}

export default App;
