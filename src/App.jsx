import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Navigation from './views/components/Navigation/Navigation';
import HomePage from './views/pages/homePage/homePage';
import Login from './views/pages/login/login';
import AddAssignments from './views/pages/addAssignments/addAssignments';
import MyAssignments from './views/pages/myAssignments/myAssignments';
import MySummaries from './views/pages/mySummaries/mySummaries';
import Signup from './views/pages/signup/signup';
import Support from './views/pages/support/support';
import UserSettings from './views/pages/userSettings/userSettings';
import Header from './views/components/Navigation/Header';
import LandingPage from './views/pages/landingPage/landingPage';


function App() {
  // נניח שמצב ההתחברות - false בהתחלה (לא מחובר)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // פונקציה לדוגמא שמתחברת - אמורה להיות מחוברת לאמת של התחברות אמיתית
  function handleLogin() {
    setIsLoggedIn(true);
  }

  // פונקציה לדוגמא להתנתקות
  function handleLogout() {
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) {
    // משתמש לא מחובר - מוציא רק עמודי נחיתה, הרשמה והתחברות (ללא ניווט)
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
          {/* כל נתיב אחר יפנה לעמוד הנחיתה */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  // משתמש מחובר - מוציא את כל המערכת עם ניווט ועמוד בית
  return (
    <Router>
      <Header onLogout={handleLogout} />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myassignments" element={<MyAssignments />} />
        <Route path="/mysummaries" element={<MySummaries />} />
        <Route path="/support" element={<Support />} />
        <Route path="/usersettings" element={<UserSettings />} />
        {/* כל נתיב אחר מפנה לעמוד הבית */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;