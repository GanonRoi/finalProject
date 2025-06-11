import React, { useState } from 'react';
import Logo from '../../../assets/Logo.jpg';
import styles from './signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../../firebase/firbase';  


function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(form.email, form.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        birthDate: form.birthDate,
        createdAt: new Date()
      });

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    if (!form.firstName || !form.lastName || !form.username || !form.birthDate) {
      alert("Please fill in all required fields before signing up with Google.");
      return;
    }

    try {
      const result = await doSignInWithGoogle();
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          firstName: form.firstName,
          lastName: form.lastName,
          username: form.username,
          email: user.email,
          birthDate: form.birthDate,
          createdAt: new Date()
        });
      }

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

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
        <form onSubmit={handleSignup}>
          <div className={styles.formRow}>
            <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          </div>
          <div className={styles.formRow}>
            <input type="text" name="username" placeholder="User name" value={form.username} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          </div>
          <div className={styles.formRow}>
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Password Verification" value={form.confirmPassword} onChange={handleChange} required />
          </div>
          <div className={styles.formRow}>
            <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} required />
          </div>
        <div className={styles.buttonDiv}>
          <button type="submit" className={styles.signupBtn}>SIGN UP</button>
        <button onClick={handleGoogleSignup} className={styles.signupBtn}>Sign up with Google</button>
        </div>
        <p className={styles.loginLink}>Already have an account? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
