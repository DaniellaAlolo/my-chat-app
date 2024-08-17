import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import fakeAuth from "./fakeAuth";

const ProtectedRoutes = () => {
  console.log("isAuthenticated:", fakeAuth.isAuthenticated); // Debugging
  return fakeAuth.isAuthenticated ? (
    <Outlet /> // Render child route element
  ) : (
    <Navigate to="/chat" replace state={{ from: "/login" }} /> // Redirect to login page
  );
};

export default ProtectedRoutes;
