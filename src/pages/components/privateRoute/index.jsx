// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Check if the user is authenticated (i.e., token exists in localStorage)
const PrivateRoute = ({ element: Component }) => {
  const token = localStorage.getItem("token");

  // If no token, redirect to login page
  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
