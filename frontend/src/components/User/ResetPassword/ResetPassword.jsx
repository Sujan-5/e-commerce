import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../../mainPage/FrontFeatures/Loading/Loader';
import {
  passwordReset,
  errorClear,
} from '../../../reduxFeature/actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import PasswordInput from '../Signup/Passwordinput';
import './resetPass.css';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.set('password', password);
    form.set('confirmPassword', confirmPassword);
    dispatch(passwordReset(params.token, form));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (success) {
      alert.success('New Password Created Successfully');
      navigate('/login');
    }
  }, [error, alert, dispatch, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="resPassContainer">
            <form
              className="resPass_form_container"
              onSubmit={handleResetPassSubmit}
            >
              <h1>Reset Password</h1>
              <div className="resetNewPass">
                <LockOpenIcon />
                <PasswordInput
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="reNewPass"
                />
              </div>
              <div className="resetConfirmPass">
                <LockIcon />
                <PasswordInput
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="confNewPass"
                />
              </div>

              <button type="submit" className="green_btn">
                Send
              </button>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
