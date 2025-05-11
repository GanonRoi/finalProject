import React from 'react';
import styles from './Header.module.css';
 import Logo from '../../../assets/Logo.jpg';

function Header() {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="לוגו האתר" className={styles.logo} />
      <h2 className={styles.headerH2 }>שלום רועי!</h2>
      <button className={styles.headerB}>LOGOUT</button>
    </header>
  );
}

export default Header;