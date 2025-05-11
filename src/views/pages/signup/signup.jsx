import React from 'react';
import Logo from '../../../assets/Logo.jpg';
import styles from './signup.module.css';

function Signup() {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.topCard}>
          <img src={Logo} alt="לוגו האתר" className={styles.logo} />
          <div className={styles.topCardText}>
            <h1>HI !</h1>
            <h2 className={styles.h2}>NICE TO MEET</h2>
            <p className={styles.signP}>Just a few details and we're getting started!</p>
          </div>
        </div>
        <div className={styles.formRow}>
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
        </div>
        <div className={styles.formRow}>
          <input type="text" name="username" placeholder="User name" required />
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className={styles.formRow}>
          <input type="password" name="password" placeholder="Password" required />
          <input type="password" name="confirmPassword" placeholder="Password Verification" required />
        </div>
        <div className={styles.formRow}>
          <input type="date" name="birthDate" required />
        </div>
        <button type="submit" className={styles.signupBtn}>SIGN UP</button>
        <p className={styles.loginLink}>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
}

export default Signup;
