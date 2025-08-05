import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useUser } from "../context/UserContext";
import MapComponent from "../components/MapComponent";
import NearByIssueCard from "../components/NearByIssueCard";
import IssueCard from "../components/IssueCard";
import Footer from "../components/Footer";

// Dummy data
const issueReports = [
  {
    latitude: 23.2599,
    longitude: 77.4126,
    title: "Pothole on 5th Street",
    description: "Deep pothole causing trouble",
    category: "pothole",
  },
  {
    latitude: 23.2605,
    longitude: 77.415,
    title: "Garbage overflow",
    description: "Bins haven't been cleared in 3 days",
    category: "garbage",
  },
  {
    latitude: 23.2611,
    longitude: 77.4108,
    title: "Broken streetlight",
    description: "Dark at night, unsafe area",
    category: "streetlight",
  },
  {
    latitude: 23.2645,
    longitude: 77.4175,
    title: "Leaking water pipe",
    description: "Causing flooding on road",
    category: "water",
  },
];

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

      {/* Map & Nearby Section */}
      <div className="flex flex-col gap-6 lg:flex-row p-4 md:p-6 lg:p-10 max-w-[1440px] mx-auto border rounded-lg overflow-hidden border-gray-200 shadow-md">
        {/* Map */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Issue Locations
          </h1>
          {true ? ( //user location dalke validate karna haii
            <MapComponent
              reports={issueReports}
              location={{
                latitude: 21.7878778, //userLocation.latitude,
                longitude: 73.4545454 //userLocation.longitude,
              }}
            />
          ) : (
            <p className="text-gray-500">Fetching location...</p>
          )}
        </div>

        {/* Nearby Issues */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Nearby Issues
          </h1>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-1">
            {issueReports.map((issue, idx) => (
              <NearByIssueCard
                key={idx}
                image="https://info.link-labs.com/hubfs/Imported_Blog_Media/8565649327_5a5130206c_b.jpg?t=1488213105988"
                title={issue.title}
                category={issue.category}
                address="Sector 17, Bhopal, near Public Park"
                postedAgo="1 day ago"
                onLike={() => console.log("Liked", issue.title)}
                onDislike={() => console.log("Disliked", issue.title)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* More Issues */}
      <div className="px-5 lg:px-10 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-5">
          More Issues in Bhopal
        </h1>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Add dynamic cards here if needed */}
          {issueReports.map((issue, idx) => (
            <IssueCard key={idx} />
          ))}
        </div>
      </div>

      <section className="px-5 lg:px-10">
        <Footer />
      </section>
    </>
  );
}

export default FeedPage;
