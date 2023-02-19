import React, { useState } from 'react';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import EyeOffIcon from '@material-ui/icons/VisibilityOff';
import styles from './styless.module.css';

const PasswordInput = ({ name, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.password_input}>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
        required
      />
      <button onClick={handleShowPassword}>
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
};

export default PasswordInput;
