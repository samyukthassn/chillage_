import React from 'react';
import { Navigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = true //useSelector((state) => state.auth.isAuthenticated); // Adjust based on your state structure

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;