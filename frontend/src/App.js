import { Route, Routes, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

// import EmailVerify from './components/EmailVerify';
import ForgotPassword from './components/ForgotPassword';

import Home from './components/mainPage/HomePage';
// import Footer from './components/mainPage/HomePage/Footer';
import { Dashboard } from './components/admin/Dashboard';
import { AllProducts } from './components/admin/Products/AllProducts';
import CreateProduct from './components/admin/Products/CreateProduct';
import Orders from './components/admin/Orders/Orders';
import AllUsers from './components/admin/Users/AllUsers';
import ProductReviews from './components/admin/Reviews/ProductReviews';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Navigate replace to="/home" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AllProducts />} />
        <Route path="/admin/product" element={<CreateProduct />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/reviews" element={<ProductReviews />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

//// "proxy": "http://192.168.254.7:8080"

export default App;
