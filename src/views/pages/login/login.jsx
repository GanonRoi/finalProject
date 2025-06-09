import React, { useState } from 'react';
import styles from './login.module.css';
import Logo from '../../../assets/Logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { auth } from '../../../firebase/firbase';

function Login({onLogin }) {
  
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(form.email, form.password);
         if (typeof onLogin === 'function') {
      onLogin();
    }
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await doSignInWithGoogle();
      navigate("/HomePage");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.topCard}>
          <img src={Logo} alt="לוגו האתר" className={styles.logo} />
          <div className={styles.topCardText}>
            <h1 className={styles.welcomeTitle}>HI !</h1>
            <h2 className={styles.welcomeSubtitle}>WELCOME BACK</h2>
          </div>
        </div>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">LOGIN</button>
        </form>
        <button onClick={handleGoogleLogin}>Login with Google</button>
        <p className={styles.registerText}>
          Don’t have an account? <Link to="/signup">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
