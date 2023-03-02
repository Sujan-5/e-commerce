import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Loader from '../../mainPage/FrontFeatures/Loading/Loader';
import { PASSWORD_UPDATE_RESET } from '../../../reduxFeature/reducers/Users/userConstants';
import {
  editPassword,
  errorClear,
} from '../../../reduxFeature/actions/userAction';
import { useNavigate } from 'react-router-dom';
import './passwordup.css';
import PasswordInput from '../Signup/Passwordinput';

export const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.account);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.set('oldPassword', oldPassword);
    form.set('newPassword', newPassword);
    form.set('confirmPassword', confirmPassword);

    dispatch(editPassword(form));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (isUpdated) {
      alert.success('Password Updated Successfully');
      navigate('/account');

      dispatch({ type: PASSWORD_UPDATE_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateConn">
            <div className="updatepass">
              <div className="updatePBox">
                <h2 className="updatePH2">Update Password</h2>
                <form
                  className="updatePassForm"
                  encType="multipart/form-data"
                  onSubmit={updatePasswordSubmit}
                >
                  <div className="oldPass">
                    <VpnKeyIcon />
                    <PasswordInput
                      type="password"
                      placeholder="Old Password"
                      onChange={(e) => setOldPassword(e.target.value)}
                      value={oldPassword}
                      required
                      className="oldpassinput"
                    />
                  </div>

                  <div className="newPass">
                    <LockOpenIcon />
                    <PasswordInput
                      type="password"
                      placeholder="New Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      required
                      className="newpassinput"
                    />
                  </div>

                  <div className="confirmPass">
                    <LockIcon />
                    <PasswordInput
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      required
                      className="confirmpassinput"
                    />
                  </div>

                  <input
                    type="submit"
                    value="Update"
                    className="updatePassBtn"
                  />
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
