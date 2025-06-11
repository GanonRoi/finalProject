import React, { useEffect, useState } from 'react';
import styles from './UserSettings.module.css';
import { auth, db } from '../../../firebase/firbase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {EmailAuthProvider,reauthenticateWithCredential,} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function UserSettings() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    birthDate: ''
  });
  const [inputPassword, setInputPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordCheck = async () => {
    const user = auth.currentUser;
    if (!user) {
      setError('No user is currently logged in.');
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, inputPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      setAccessGranted(true);
      setError('');

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          username: data.username || '',
          email: data.email || '',
          password: '', 
          birthDate: data.birthDate || ''
        });
      }
    } catch (err) {
      console.error('Reauthentication failed:', err);
      setError('Incorrect password. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user) {
      setError('No user logged in.');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        birthDate: formData.birthDate
      });

      navigate('/home');
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Error updating user.');
    }
  };

  return (
    <div className={styles.mainDiv}>
      {!accessGranted && (
  <div className={styles.popupOverlay}>
    <div className={styles.popup}>
      <h3>Enter your password</h3>
      <input
        type="password"
        placeholder="Password"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={handlePasswordCheck}>Continue</button>
    </div>
  </div>
)}

      {accessGranted && (
        <div className={styles.formContainer}>
          <h2>Hey, let's update the user information 🧠</h2>
          <div className={styles.inputGrid}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="User name"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={inputPassword}
              readOnly
            />
            <input
              type="date"
              name="birthDate"
              placeholder="Birth Date"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleUpdate} className={styles.updateBtn}>UPDATE</button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </div>
  );
}


export default UserSettings;
