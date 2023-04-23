import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { useAlert } from 'react-alert';
import { errorClear, login } from '../../../reduxFeature/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../mainPage/FrontFeatures/Loading/Loader';
import PasswordInput from '../Signup/Passwordinput';

const Login = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [emailLogin, setLoginEmail] = useState('');
  const [passLogin, setLoginPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(emailLogin, passLogin));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
      dispatch(errorClear());
    }
    if (isAuthenticated) {
      alert.success('Login Successfull');
      navigate('/home');
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  const queryParams = new URLSearchParams(location.search);
  const verified = queryParams.get('verified');

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.login_container}>
          <div className={styles.login_form_container}>
            <div className={styles.left}>
              {verified && (
                <p className={styles.verified_message}>
                  Email verified. You can now login.
                </p>
              )}
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <div>
                  <h1>Login</h1>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setLoginEmail(e.target.value)}
                    value={emailLogin}
                    required
                    className={styles.input}
                  />
                </div>
                <div>
                  <PasswordInput
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setLoginPass(e.target.value)}
                    value={passLogin}
                    required
                    className={styles.input}
                  />
                </div>
                <Link
                  to="/forgot/password"
                  style={{ alignSelf: 'flex-start', textDecoration: 'none' }}
                >
                  <p style={{ padding: '0 12px' }}>Forgot Password ?</p>
                </Link>

                <button type="submit" className={styles.green_btn}>
                  Login
                </button>

                <div className="aregister">
                  <span className="aregister_span">
                    New Here?{' '}
                    <Link className="alogin" to="/signup">
                      SignUp
                    </Link>
                  </span>
                </div>
              </form>
            </div>

            {/* <div className={styles.right}>
              <h1>Register Here</h1>
              <Link to="/signup">
                <button type="button" className={styles.white_btn}>
                  Sign Up
                </button>
              </Link> */}
            {/* </div> */}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
