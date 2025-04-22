import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.nav}>
       <ul>
        <li><NavLink to="/Signup" className={({ isActive }) => isActive ? styles.active : styles.link}>עמוד הרשמה</NavLink></li>
        <li><NavLink to="/Login" className={({ isActive }) => isActive ? styles.active : styles.link}>עמוד התחברות</NavLink></li>
        <li><NavLink to="/AddAssignments" className={({ isActive }) => isActive ? styles.active : styles.link}>הוספת משימות</NavLink></li>
        <li><NavLink to="/MyAssignments" className={({ isActive }) => isActive ? styles.active : styles.link}>המשימות שלי</NavLink></li>
        <li><NavLink to="/MySummaries" className={({ isActive }) => isActive ? styles.active : styles.link}>הסיכומים שלי</NavLink></li>
        <li><NavLink to="/Support" className={({ isActive }) => isActive ? styles.active : styles.link}>תמיכה</NavLink></li>
        <li><NavLink to="/UserSettings" className={({ isActive }) => isActive ? styles.active : styles.link}>עדכון פרטים</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
