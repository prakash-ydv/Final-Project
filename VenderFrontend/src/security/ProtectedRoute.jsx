import React from "react";
import { Navigate } from "react-router-dom";
import { useVendor } from "../context/VendorContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useVendor();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
