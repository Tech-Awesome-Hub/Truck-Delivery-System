import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Location from './pages/map';
import UserProfile from './pages/userProfile';
import TripHistory from './pages/tripHistory';
import DriverDashboard from './pages/DriverDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import AvailableTrucks from './pages/AvailableTrucks';
import ProtectedRoute from './components/protectedRoute'; 

const App = () => {
  
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services"  element={<Services />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trip-history" element={<TripHistory />} />
          <Route path="/map" element={<Location />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/driver-dashboard" element={ <ProtectedRoute><DriverDashboard /></ProtectedRoute> } />
          <Route path="/customer-dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/available-trucks" element={<AvailableTrucks />} />
        </Routes>
    </Router>
  );
};

export default App;
