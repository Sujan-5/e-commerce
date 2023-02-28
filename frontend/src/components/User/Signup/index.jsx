import { useState, useEffect, Fragment } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { errorClear, register } from '../../../reduxFeature/actions/userAction';
import { useAlert } from 'react-alert';
import PasswordInput from './Passwordinput';
import Loader from '../../mainPage/FrontFeatures/Loading/Loader';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import FaceIcon from '@material-ui/icons/Face';

const Signup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [setError] = useState();

  const { error, loading } = useSelector((state) => state.user);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    contact: '',
    avatar: '',
    avatarPreview: null,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    address,
    contact,
  } = data;

  const [avatar, setAvatar] = useState('/profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/profile.png');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.set('firstName', firstName);
    form.set('lastName', lastName);
    form.set('email', email);
    form.set('address', address);
    form.set('contact', contact);
    form.set('password', password);
    form.set('confirmPassword', confirmPassword);
    form.set('avatar', avatar);
    dispatch(register(form));

    if (password !== confirmPassword) {
      setError('Password does not match');
    } else {
      resetFormData();
    }
  };

  const resetFormData = () => {
    setData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      contact: '',
      avatar: '',
      avatarPreview: null,
    });
  };

  const registerHandleChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.signup_container}>
          <div className={styles.signup_form_container}>
            <div className={styles.right}>
              <form
                className={styles.form_container}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <h2>Create Account</h2>
                <div className={styles.nameInRow}>
                  <div className={styles.signUpName}>
                    <FaceIcon className={styles.icon} />
                    <input
                      type="text"
                      placeholder="First Name : e.g. John"
                      name="firstName"
                      onChange={registerHandleChange}
                      value={firstName}
                      required
                      className={styles.nameinput}
                    />
                  </div>
                  <div className={styles.signUpName}>
                    <input
                      type="text"
                      placeholder="Last Name : e.g. Doe"
                      name="lastName"
                      onChange={registerHandleChange}
                      value={lastName}
                      required
                      className={styles.nameinput}
                    />
                    <FaceIcon className={styles.icon} />
                  </div>
                </div>
                <div className={styles.signUpName}>
                  <MailOutlineIcon className={styles.icon} />
                  <input
                    type="email"
                    placeholder="Email : e.g. example@gmail.com"
                    name="email"
                    onChange={registerHandleChange}
                    value={email}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.signUpName}>
                  <LocationCityIcon className={styles.icon} />
                  <input
                    type="text"
                    placeholder="Address : e.g. narayantar, jorpati"
                    name="address"
                    onChange={registerHandleChange}
                    value={address}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.signUpName}>
                  <SmartphoneIcon className={styles.icon} />
                  <input
                    type="Number"
                    placeholder="Contacts : e.g. 98000000000"
                    name="contact"
                    onChange={registerHandleChange}
                    value={contact}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.signUpName}>
                  <PasswordInput
                    placeholder="Password"
                    name="password"
                    onChange={registerHandleChange}
                    value={password}
                    required
                  />
                </div>
                <div className={styles.signUpName}>
                  <PasswordInput
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={registerHandleChange}
                    value={confirmPassword}
                    required
                  />
                </div>

                <div id={styles.registerImage}>
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerHandleChange}
                  />
                </div>

                <button type="submit" className={styles.green_btn}>
                  Sign Up
                </button>

                <div className="aregister">
                  <span className="aregister_span">
                    Already Register?{' '}
                    <Link className="alogin" to="/login">
                      Login Now
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Signup;
