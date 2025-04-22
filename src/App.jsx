import { BrowserRouter, Routes, Route } from 'react-router-dom';
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


function App() {
  return (
    
    <BrowserRouter>
    <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AddAssignments" element={<AddAssignments />} />
        <Route path="/MyAssignments" element={<MyAssignments />} />
        <Route path="/MySummaries" element={<MySummaries />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/UserSettings" element={<UserSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;