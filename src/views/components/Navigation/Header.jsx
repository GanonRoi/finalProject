import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Logo from '../../../assets/Logo.jpg';
import { auth } from '../../../firebase/firbase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firbase';
import { useNavigate } from 'react-router-dom'; 

function Header() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserName(data.firstName || "משתמש");
          } else {
            console.log("לא נמצאו נתונים עבור המשתמש");
          }
        } catch (error) {
          console.error("שגיאה בשליפת שם משתמש:", error);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate('/');       
    } catch (error) {
      console.error("שגיאה בהתנתקות:", error);
    }
  };

  return (
    <header className={styles.header}>
      <img src={Logo} alt="לוגו האתר" className={styles.logo} />
      <h2 className={styles.headerH2}>Hello {userName}!</h2>
      <button onClick={handleLogout} className={styles.headerB}>LOGOUT</button>
    </header>
  );
}

export default Header;
