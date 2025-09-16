import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// ProtectedRoute component
const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("token"); // Check admin login token

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Otherwise render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
