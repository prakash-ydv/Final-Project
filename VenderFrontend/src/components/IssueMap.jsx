import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function IssueMap({
  lat = 23.2599,
  lng = 77.4126,
  title = "Issue Location",
  status = "Pending",
}) {
  // Status color classes
  const statusColors = {
    Pending: "text-yellow-700 font-medium",
    Completed: "text-green-700 font-medium",
    Rejected: "text-red-700 font-medium",
  };

  return (
    <div className="w-full h-64 p-5 lg:px-10 rounded-lg overflow-hidden border border-gray-300">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={markerIcon}>
          <Popup>
            <div>
              <h2 className="font-semibold text-gray-800">{title}</h2>
              <p className={statusColors[status] || "text-gray-700"}>
                Status: {status}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default IssueMap;
