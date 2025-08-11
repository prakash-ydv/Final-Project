// VendorContext.js
import React, { createContext, useContext, useState } from "react";

// Context create kiya
const VendorContext = createContext();

// Provider Component
export function VendorProvider({ children }) {
  const [vendor, setVendor] = useState({});
  const [isLogedIn, setIsLogedIn] = useState(true);

  const updateVendor = (data) => {
    setVendor((prev) => ({ ...prev, ...data }));
  };

  return (
    <VendorContext.Provider
<<<<<<< HEAD
      value={{ vendor, updateVendor, setVendor, isLogedIn, setIsLogedIn }}
=======
      value={{ vendor, updateVendor, setVendor, setIsLogedIn }}
>>>>>>> ec42a5d7ebac66fbc8778aa9e668e47ce5866965
    >
      {children}
    </VendorContext.Provider>
  );
}

// Custom Hook for easy usage
export function useVendor() {
  return useContext(VendorContext);
}
