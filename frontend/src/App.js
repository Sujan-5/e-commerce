import { Route, Routes, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/User/Login';
import Signup from './components/User/Signup';
import ForgotPassword from './components/User/ForgotPassword/index';
import Home from './components/mainPage/Home';
import Footer from './components/mainPage/HomePage/Footer';
import ProductDetails from './components/mainPage/Products/ProductDetails';
import { Dashboard } from './components/admin/Dashboard';
import { AllProducts } from './components/admin/Products/AllProducts';
import CreateProduct from './components/admin/Products/CreateProduct';
import Orders from './components/admin/Orders/Orders';
import AllUsers from './components/admin/Users/AllUsers';
import ProductReviews from './components/admin/Reviews/ProductReviews';
import Updateproduct from './components/admin/Products/Updateproduct';
import Category from './components/admin/Category/Category';
// import UpdateCategory from './components/admin/Category/UpdateCategory';
import { CategoryList } from './components/admin/Category/CategoryList';
import { useEffect } from 'react';
import { getAllCategory } from './reduxFeature/actions/categoryAction';
import { useDispatch } from 'react-redux';
import store from './store';
import { userLoad } from './reduxFeature/actions/userAction';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import UserProfile from './components/User/UserProfile/UserProfile';
import UpdateProfile from './components/User/UserProfile/UpdateProfile';
import { UpdatePassword } from './components/User/Updatepassword/UpdatePassword';
import { CartS } from './components/ShoppingCart/CartS';
import Navbar from './components/mainPage/HomePage/Navbar';
import ResetPassword from './components/User/ResetPassword/ResetPassword';
import Shipping from './components/ShippingAndChekout/Shipping';
import OrderDetails from './components/ShippingAndChekout/OrderDetails';
import Productcard from './components/mainPage/Products/Productcard';
// import StockPage from './components/admin/Stock/StockPage';
import AddStock from './components/admin/Stock/AddStock';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    store.dispatch(userLoad());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/" exact element={<Navigate replace to="/home" />} />
        <Route path="/search/:keyword" element={Productcard} />
        <Route path="/cart" element={<CartS />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<UserProfile />} exact />
          <Route path="/update/profile" element={<UpdateProfile />} exact />
          <Route path="/update/password" element={<UpdatePassword />} exact />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/details" element={<OrderDetails />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<AllProducts />} />
          <Route path="/admin/product" element={<CreateProduct />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/admin/reviews" element={<ProductReviews />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/categories" element={<CategoryList />} />
          {/* <Route path="/admin/category/:id" element={<PrivateRoute element={<UpdateCategory />} />} /> */}
          *
          <Route path="/admin/product/:id" element={<Updateproduct />} />
          <Route path="/admin/stock/:id" element={<AddStock />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

// "proxy": "http://192.168.254.7:8080"

export default App;
