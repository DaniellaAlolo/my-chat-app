import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated:"); // Debugging

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
