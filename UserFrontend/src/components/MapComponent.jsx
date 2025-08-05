// components/MapComponent.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapComponent({ location }) {
  const defaultPosition = [location.latitude, location.longitude];

  return (
    <div className="h-[400px] w-full rounded-md overflow-hidden">
      <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={defaultPosition}>
          <Popup>
            You are here! 📍<br />
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapComponent;
