// VendorContext.js
import React, { createContext, useContext, useState } from "react";

// Context create kiya
const VendorContext = createContext();

// Provider Component
export function VendorProvider({ children }) {
  const [vendor, setVendor] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
  });
  const [isLogedIn, setIsLogedIn] = useState(true);

  const updateVendor = (data) => {
    setVendor((prev) => ({ ...prev, ...data }));
  };

  return (
    <VendorContext.Provider value={{ vendor, updateVendor }}>
      {children}
    </VendorContext.Provider>
  );
}

// Custom Hook for easy usage
export function useVendor() {
  return useContext(VendorContext);
}
