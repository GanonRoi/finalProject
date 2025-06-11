import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
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
import { useAuth } from './contexts/authContext';
function App() {
  const { userLoggedIn, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      {userLoggedIn && <Header />}
      {userLoggedIn && <Navigation />}
      <Routes>
        {!userLoggedIn ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/myassignments" element={<MyAssignments />} />
            <Route path="/mysummaries" element={<MySummaries />} />
            <Route path="/support" element={<Support />} />
            <Route path="/usersettings" element={<UserSettings />} />
            <Route path="/AddAssignments" element={<AddAssignments />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
