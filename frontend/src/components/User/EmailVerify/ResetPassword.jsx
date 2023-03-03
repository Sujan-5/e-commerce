import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../../mainPage/FrontFeatures/Loading/Loader';
import {
  resetPassword,
  errorClear,
} from '../../../reduxFeature/actions/userAction';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import styles from './styles.module.css';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.set('password', password);
    form.set('confirmPassword', confirmPassword);
    dispatch(resetPassword(form));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (message) {
      alert.success(message);
    }
  }, [error, alert, dispatch, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className={styles.forPassContainer}>
            <form
              className={styles.forPass_form_container}
              onSubmit={handleForgotSubmit}
            >
              <h1>Forgot Password</h1>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={data.email}
                  required
                  className={styles.input}
                />
              </div>

              <button type="submit" className={styles.green_btn}>
                Send
              </button>
            </form>
          </div>{' '}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
