import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  const token = localStorage.getItem('token');
  const location = useLocation();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Routes>
        <Route 
          path="/login" 
          element={!token ? <LoginPage /> : <Navigate to="/" state={{ from: location }} replace />} 
        />
        <Route 
          path="/*" 
          element={token ? <Dashboard /> : <Navigate to="/login" state={{ from: location }} replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;
