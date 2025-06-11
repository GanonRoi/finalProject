import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.nav}>
       <ul>
        <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link}>Home Page</NavLink></li>
        <li><NavLink to="/MyAssignments" className={({ isActive }) => isActive ? styles.active : styles.link}>My Assignments</NavLink></li>
        <li><NavLink to="/AddAssignments" className={({ isActive }) => isActive ? styles.active : styles.link}>Update/Add</NavLink></li>
        <li><NavLink to="/MySummaries" className={({ isActive }) => isActive ? styles.active : styles.link}>My Summaries</NavLink></li>
        <li><NavLink to="/Support" className={({ isActive }) => isActive ? styles.active : styles.link}>User Support</NavLink></li>
        <li><NavLink to="/UserSettings" className={({ isActive }) => isActive ? styles.active : styles.link}>User Settings</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
