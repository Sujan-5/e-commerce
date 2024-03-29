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
import AllUsers from './components/admin/Users/AllUsers';
import ProductReviews from './components/admin/Reviews/ProductReviews';
import Updateproduct from './components/admin/Products/Updateproduct';
import Category from './components/admin/Category/Category';
import UpdateCategory from './components/admin/Category/UpdateCategory';
import { CategoryList } from './components/admin/Category/CategoryList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import AddStock from './components/admin/Stock/AddStock';
import { ProductsPage } from './components/mainPage/Products/ProductsPage';
import UserOrder from './components/mainPage/Orders/UserOrder';
import OrdersList from './components/admin/Orders/OrdersList';
import Success from './components/mainPage/Orders/Success';
import UpdateOrder from './components/admin/Orders/UpdateOrder';
import { getAllCategory } from './reduxFeature/actions/categoryAction';
import CategoryCard from './components/mainPage/HomePage/CategoryCard';
import UserOrderDetails from './components/mainPage/Orders/UserOrderDetails';
import UpdateUser from './components/admin/Users/UpdateUser';
import SearchFilter from './components/mainPage/Filters/SearchFilter';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    store.dispatch(userLoad());
  }, []);

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
        <Route path="/allProducts" element={<ProductsPage />} />
        <Route path="/allProducts/:search" element={<SearchFilter />} />
        <Route path="/cart" element={<CartS />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/account" element={<UserProfile />} exact />
        <Route path="/update/profile" element={<UpdateProfile />} exact />
        <Route path="/update/password" element={<UpdatePassword />} exact />
        <Route path="/shipping" element={<Shipping />} exact />
        <Route path="/order/details" element={<OrderDetails />} exact />
        <Route path="/myorder" element={<UserOrder />} exact />
        <Route path="/order/success" element={<Success />} exact />
        <Route
          path="/myorder/details/:id"
          element={<UserOrderDetails />}
          exact
        />
        <Route path="/category/:cat" element={<CategoryCard />} exact />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AllProducts />} />
        <Route path="/admin/product" element={<CreateProduct />} />
        <Route path="/admin/orders" element={<OrdersList />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/user/:id" element={<UpdateUser />} />
        <Route path="/admin/reviews" element={<ProductReviews />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/categories" element={<CategoryList />} />
        <Route path="/admin/category/:id" element={<UpdateCategory />} />
        <Route path="/admin/product/:id" element={<Updateproduct />} />
        <Route path="/admin/stock/:id" element={<AddStock />} />
        <Route path="/admin/update/order/:id" element={<UpdateOrder />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// "proxy": "http://192.168.254.7:8080"

export default App;
