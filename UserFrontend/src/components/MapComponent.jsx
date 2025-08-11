// components/MapComponent.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Icons per category
const iconMap = {
  pothole: new L.Icon({
    iconUrl: "/icons/pothole.png",
    iconSize: [50, 50],
  }),
  garbage: new L.Icon({
    iconUrl: "/icons/garbage.png",
    iconSize: [80, 80],
  }),
  streetlight: new L.Icon({
    iconUrl: "./images/dustbin.png",
    iconSize: [80, 80],
  }),
  default: new L.Icon({
    iconUrl: "/icons/default-icon.png",
    iconSize: [80, 80],
  }),
};

function MapComponent({ location, reports = [] }) {
  const defaultPosition = [location.latitude, location.longitude];

  return (
    <div className="h-[500px] w-full rounded-md overflow-hidden">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        {/* User location */}
        <Marker position={defaultPosition}>
          <Popup>
            You are here! 📍 <br />
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </Popup>
        </Marker>

        {/* All reported issues */}
        {reports.map((report, index) => (
          <Marker
            key={index}
            position={[report.latitude, report.longitude]}
            icon={iconMap[report.category] || iconMap.default}
          >
            <Popup>
              <strong>{report.title}</strong>
              <br />
              {report.description}
              <br />
              <em>{report.category}</em>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
