import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import convertToBase64 from './convert';
import avatar from '../../displayProductImages/profile.png';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import EyeOffIcon from '@material-ui/icons/VisibilityOff';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [avatar, setAvatar] = useState('/logo192.png');
  // const [avatarPreview, setAvatarPreview] = useState('/logo192.png');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { firstName, lastName, email, password, confirmPassword } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      if (password !== confirmPassword) {
        setError('Password does not match');
      }

      const res = await axios.post('/api/log/register', body, config);
      setMsg(res.message);
      console.log(res.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // const registerDataChange = (e) => {
  //   if (e.target.name === 'avatar') {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatarPreview(reader.result);
  //         setAvatar(reader.result);
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   } else {
  //     setData({ ...data, [e.target.name]: e.targe.value });
  //   }
  // };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <div className="profile">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {/* <div className={styles.avatarImg}>
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name={avatar}
                accept="image/*"
                onChange={registerDataChange}
              ></input>
            </div> */}
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
