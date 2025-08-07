import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // assuming this holds auth state

function ProtectedRoute({ children }) {
  const { admin } = useUser(); // check if user is logged in

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
