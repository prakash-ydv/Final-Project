import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function ProtectedRoute({ children }) {
  const { isLogedIn } = useUser();
  const isAuthenticated = isLogedIn; 
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
