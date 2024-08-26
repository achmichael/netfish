// service/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = !!localStorage.getItem("data"); // Ganti dengan logika autentikasi Anda

  return isAuthenticated ? Component : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
