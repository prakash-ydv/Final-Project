import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useUser } from "../context/UserContext";
import MapComponent from "../components/MapComponent";

function FeedPage() {
  const { userLocation, setUserLocation } = useUser();
  useEffect(() => {
    if (!userLocation && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log("📍 Accurate location set:", position.coords);
        },
        (error) => {
          console.error("❌ Error getting location:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, [userLocation, setUserLocation]);

  return (
    <>
      <NavBar />
      {userLocation ? <MapComponent location={userLocation} /> : ""}
    </>
  );
}

export default FeedPage;
