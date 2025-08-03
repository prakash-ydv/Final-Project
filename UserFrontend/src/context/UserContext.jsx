import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    // Optionally save to localStorage or cookie
  };

  const logout = () => {
    setUser(null);
    // Remove from storage if needed
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLogedIn }}>
      {children}
    </UserContext.Provider>
  );
};
