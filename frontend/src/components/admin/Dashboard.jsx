import React, { useEffect } from 'react';
import { LeftSidebar } from './LeftSidebar';
import './dashboard.css';
import { Link } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PeopleIcon from '@mui/icons-material/People';
import { useSelector, useDispatch } from 'react-redux';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getAdminProduct } from '../../reduxFeature/actions/productAction';
import { allOrdersAdmin } from '../../reduxFeature/actions/OrderAction';
import { usersList } from '../../reduxFeature/actions/userAction';

export const Dashboard = () => {
  Chart.register(...registerables);

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.orders);
  const { users } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(allOrdersAdmin());
    dispatch(usersList());
  }, [dispatch]);

  let revenue = 0;
  orders &&
    orders.forEach((item) => {
      console.log(item);
      if (item.orderStatus !== 'Cancelled') {
        revenue += item.totalPrice;
      }
    });

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'Total Amount',
        backgroundColor: ['Black'],
        data: [0, revenue],
      },
    ],
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue',
        backgroundColor: '#3f51b5',
        borderColor: '#3f51b5',
        borderWidth: 1,
        hoverBackgroundColor: '#1a237e',
        hoverBorderColor: '#1a237e',
        data: [revenue],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }],
    },
  };

  return (
    <div className="dashboard">
      <LeftSidebar />
      <div className="dashContainer">
        <h1 component="h1">Dashboard</h1>
        <div className="dash">
          <div className="dash-2">
            <Link to="/admin/dashboard">
              <p>
                <MonetizationOnIcon
                  style={{
                    width: '50px',
                    height: '40px',
                    marginRight: '10px',
                    marginBottom: '-12px',
                  }}
                />
                Revenue{' '}
              </p>
              <p>
                {' '}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs. {
                  revenue
                }{' '}
              </p>
            </Link>
            <Link to="/admin/products">
              <p>
                <ShoppingBasketIcon
                  style={{
                    width: '50px',
                    height: '40px',
                    marginRight: '10px',
                    marginBottom: '-12px',
                  }}
                />
                Products
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {products && products.length}
              </p>
            </Link>
            <Link to="/admin/orders">
              <p>
                <LocalGroceryStoreIcon
                  style={{
                    width: '50px',
                    height: '40px',
                    marginRight: '10px',
                    marginBottom: '-12px',
                  }}
                />
                Orders
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {orders && orders.length}
              </p>
            </Link>
            <Link to="/admin/users">
              <p>
                <PeopleIcon
                  style={{
                    width: '50px',
                    height: '40px',
                    marginRight: '10px',
                    marginBottom: '-12px',
                  }}
                />
                Users
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {users && users.length}
              </p>
            </Link>
          </div>
        </div>
        <div className="lineChart1">
          <Line data={lineState} />
        </div>
        <div style={{ height: '300px', width: '100%' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
