import { useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

const ForgotPassword = () => {
  const [data, setData] = useState({ email: '' });
  const [error, setError] = useState('');

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/log/password/forgot-password';
      const { data: res } = await axios.post(url, data);

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
    <div className={styles.container}>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
          className={styles.input}
        />
        {error && <div className={styles.error_msg}>{error}</div>}
        <button type="submit" className={styles.green_btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
