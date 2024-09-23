import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import UserReviews from './UserReviews';



const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/recipes" element={<RecipeCard user={user} />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/my-reviews" element={<UserReviews user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
