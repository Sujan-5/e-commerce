import { Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';

// import EmailVerify from './components/EmailVerify';
import ForgotPassword from './components/ForgotPassword';

import Home from './components/mainPage/allPages';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/home" />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
