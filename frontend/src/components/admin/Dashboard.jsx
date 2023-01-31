import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import './dashboard.css';
import { Link } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PeopleIcon from '@mui/icons-material/People';
import { useSelector } from 'react-redux';
// import { Line } from 'react-chartjs-2';

export const Dashboard = () => {
  // const lineState = {
  //   labels: ['Initial Amount', 'Amount Earned'],
  //   datasets: [
  //     {
  //       label: 'Total Amount',
  //       backgroundColor: ['Black'],
  //       data: [0, 4000],
  //     },
  //   ],
  // };

  // const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

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
              <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs. 1 </p>
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
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1</p>
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
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1</p>
            </Link>
          </div>
        </div>
        {/* <div className="line"><Line data={lineState} /></div> */}
      </div>
    </div>
  );
};
