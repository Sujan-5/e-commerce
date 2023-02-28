import React, { Fragment, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './userprofile.css';
import { useSelector } from 'react-redux';
import Loader from '../../mainPage/FrontFeatures/Loading/Loader';
import moment from 'moment';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import { Avatar } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

const UserProfile = () => {
  const navigate = useNavigate();

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const date = moment(user?.createdAt);
  const formattedDate = date.format('MMM D, YYYY');

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const fullName = `${user && user.firstName} ${user && user.lastName}`;
  const isAdmin = user?.role === 'admin';

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="accountCont">
            <div className="first">
              <h1>My Account</h1>
              {/* <img src={user.avatar?.url} alt={user.name} /> */}

              {/* verified profile start*/}
              <div className="container">
                <div className="profile">
                  <Avatar className="avatar" src={user.avatar?.url} />
                  <div className="userWappper">
                    <span className="username">@{fullName} </span>
                    {user?.isVerified && (
                      <VerifiedIcon className="verified-icon" color="primary" />
                    )}
                  </div>
                  {isAdmin ? (
                    <div className="userInfo">
                      <span className="admintitle">You are Admin</span>
                    </div>
                  ) : (
                    <div className="userInfo">
                      <span className="item-title">Account Details</span>
                      <div className="item">
                        <EmailIcon className="icon" />
                        <span className="data">{user?.email}</span>
                      </div>

                      <div className="item">
                        <LocationCityIcon className="icon" />
                        <span className="data">{user?.address}</span>
                      </div>
                      <div className="item">
                        <SmartphoneIcon className="icon" />
                        <span className="data">{user?.contact}</span>
                      </div>

                      <span className="item-title">Joined {formattedDate}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* verified profile end*/}
            </div>

            <div className="second">
              <h3>Manage My Account</h3>
              <div className="personalProfile">
                <h4>Personal Profile</h4>

                <h5>{fullName}</h5>
                <h5>{user.email}</h5>
                <Link to="/update/profile" style={{ textDecoration: 'none' }}>
                  <button>Edit</button>
                </Link>
              </div>
              <div className="buttons">
                <Link to="/orders">My Orders</Link>
                <Link to="/update/password">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserProfile;
