import { Route, Routes, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/User/Login';
import Signup from './components/User/Signup';

// import EmailVerify from './components/EmailVerify';
import ForgotPassword from './components/ForgotPassword';

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
import Search from './components/mainPage/Filters/Search';
import { CategoryList } from './components/admin/Category/CategoryList';
import { useEffect } from 'react';
import { getAllCategory } from './reduxFeature/actions/categoryAction';
import { useDispatch } from 'react-redux';
import store from './store';
import { userLoad } from './reduxFeature/actions/userAction';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    store.dispatch(userLoad());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Navigate replace to="/home" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/searchproducts" element={<Search />} />
        //admin
        <Route
          path="/admin/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/admin/products"
          element={<PrivateRoute element={<AllProducts />} />}
        />
        <Route
          path="/admin/product"
          element={<PrivateRoute element={<CreateProduct />} />}
        />
        <Route
          path="/admin/orders"
          element={<PrivateRoute element={<Orders />} />}
        />
        <Route
          path="/admin/users"
          element={<PrivateRoute element={<AllUsers />} />}
        />
        <Route
          path="/admin/reviews"
          element={<PrivateRoute element={<ProductReviews />} />}
        />
        <Route
          path="/admin/category"
          element={<PrivateRoute element={<Category />} />}
        />
        <Route
          path="/admin/categories"
          element={<PrivateRoute element={<CategoryList />} />}
        />
        {/* <Route path="/admin/category/:id" element={<PrivateRoute element={<UpdateCategory />} />} /> */}
        *{' '}
        <Route
          path="/admin/product/:id"
          element={<PrivateRoute element={<Updateproduct />} />}
        />
        <Route
          path="/product/:id"
          element={<PrivateRoute element={<ProductDetails />} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

// "proxy": "http://192.168.254.7:8080"

export default App;
