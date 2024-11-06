import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin');

  // If admin is not logged in, redirect to the login page
  return isAdmin ? children : <Navigate to="/adminlogin" />;
};


export default ProtectedRoute;
