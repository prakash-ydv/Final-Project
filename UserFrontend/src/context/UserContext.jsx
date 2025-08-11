import React, { createContext, useContext, useState, useEffect } from "react";
import { useLayersControl } from "react-leaflet/LayersControl";
import Cookies from "js-cookie";
import { getAllIssuesApi } from "../api/issueOperations";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [myReports, setMyReports] = useState(null);
  const [trendingIssues, setTrendingIssues] = useState([]);

  // get all issues
  useEffect(() => {
    async function fetchAllIssues() {
      const data = await getAllIssuesApi();
      setTrendingIssues(data);
    }
    fetchAllIssues();
  }, []);
  // find cookies
  useEffect(() => {
    const token = Cookies.get("token");
    console.log("token :", token);
  }, [isLogedIn]);
  // get user location
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
        trendingIssues
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
