import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/log/login';
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      window.location = '/home';
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

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type={!passShow ? 'password' : 'text'}
              // type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <Link to="/forgot-password" style={{ alignSelf: 'flex-start' }}>
              <p style={{ padding: '0 12px' }}>Forgot Password ?</p>
            </Link>
            <div
              className={styles.showpass}
              onClick={() => setPassShow(!passShow)}
            >
              {!passShow ? 'Show' : 'Hide'}
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Login
            </button>
          </form>
        </div>

        {msg && <div className={styles.success_msg}>{msg}</div>}
        <div className={styles.right}>
          <h1>Register Here</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
