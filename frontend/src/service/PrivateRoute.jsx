// service/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, roles = [] }) => {

  const userData = localStorage.getItem('data');

  const user = userData ? JSON.parse(userData) : null;

  const isAuthenticated = !!user;

  const isAuthorize = roles.includes(user?.role);

  return isAuthenticated && isAuthorize ? Component : <Navigate to={"/auth/login"}/>
};

export default PrivateRoute;
