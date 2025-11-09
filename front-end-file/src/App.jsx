import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Terms from './components/Terms/Terms'
import Dashboard from './components/Pricelist/Dashboard'
import PriceList from './components/Pricelist/PriceList'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <Routes>
      <Route path="/" element={
        isLoggedIn ? (
          <Terms userEmail={userEmail} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )
      } />
      <Route path="/pricelist" element={
        isLoggedIn ? <PriceList /> : <Navigate to="/" />
      } />
      <Route path="/dashboard" element={
        isLoggedIn ? <Dashboard /> : <Navigate to="/" />
      } />
    </Routes>
  )
}

export default App
