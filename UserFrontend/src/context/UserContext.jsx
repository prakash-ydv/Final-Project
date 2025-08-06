import React, { createContext, useContext, useState, useEffect } from "react";
import { useLayersControl } from "react-leaflet/LayersControl";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!userLocation) return;
    console.log("location set", userLocation);
  }, [userLocation]);

  const login = (userData) => {
    setUser(userData);
    setIsLogedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLogedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isLogedIn,
        setIsLogedIn,
        userLocation,
        setUserLocation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
