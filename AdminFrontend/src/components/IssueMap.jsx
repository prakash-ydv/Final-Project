import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

// Import leaflet styles
import "leaflet/dist/leaflet.css";

// Import marker images explicitly (Vite/ESM friendly)
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix default marker paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function IssueMap({ issues }) {
  const navigate = useNavigate();

  const center = issues.length
    ? [issues[0].lat, issues[0].lng]
    : [51.505, -0.09];

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {issues.map((issue, index) => (
          <Marker key={index} position={[issue.lat, issue.lng]}>
            <Popup>
              <strong>{issue.title}</strong>
              <br />
              {issue.location}
              <br />
              Priority:{" "}
              <span
                style={{
                  color:
                    issue.priority === "high"
                      ? "red"
                      : issue.priority === "medium"
                      ? "orange"
                      : "green",
                }}
              >
                {issue.priority}
              </span>
              <br />
              Status: <b>{issue.status}</b>
              <br />
              <small>{issue.description}</small>
              <br />
              <button
                style={{
                  marginTop: "5px",
                  padding: "4px 8px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/issue`)}
              >
                View Problem
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default IssueMap;
