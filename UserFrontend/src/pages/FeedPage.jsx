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
    latitude: 18.5204,
    longitude: 73.8567,
    title: "Pothole on JM Road",
    description: "Deep pothole causing trouble",
    category: "pothole",
  },
  {
    latitude: 18.5293,
    longitude: 73.8494,
    title: "Garbage overflow",
    description: "Bins haven't been cleared in 3 days",
    category: "garbage",
  },
  {
    latitude: 18.531,
    longitude: 73.8441,
    title: "Broken streetlight",
    description: "Dark at night, unsafe area",
    category: "streetlight",
  },
  {
    latitude: 18.5152,
    longitude: 73.8415,
    title: "Leaking water pipe",
    description: "Causing flooding on road",
    category: "water",
  },
];

const reports = [
  {
    issueCoordinates: {
      latitude: 16.5975,
      longitude: 74.1005,
    },
    _id: "689a1393e20bf0269b6d4f35",
    issueId: "ISSUE112",
    issueTitle: "garbage roadside",
    issueDepartment: "Garbage",
    reporterName: "Prakash Yadav",
    reporterPhone: 8210918083,
    reporterId: "6899a16d06ec9b0368554466",
    landmark: "near market",
    issueStatus: "pending",
    imageUrl:
      "https://res.cloudinary.com/ddzhczocz/image/upload/v1754928018/uploads/m7rjr5tx0fsuyxjxcpsi.jpg",
    upvotedBy: [],
    comments: [],
    createdAt: "2025-08-11T16:00:19.072Z",
    updatedAt: "2025-08-11T16:00:19.072Z",
    __v: 0,
  },
  {
    issueCoordinates: {
      latitude: 18.4943,
      longitude: 74.01971,
    },
    _id: "689a0d13e20bf0269b6d4f26",
    issueId: "ISSUE112",
    issueTitle: "Garbag in Old Lake",
    issueDepartment: "Garbage",
    reporterName: "Prakash Yadav",
    reporterPhone: 8210918083,
    reporterId: "6899a16d06ec9b0368554466",
    landmark: "Near Old School",
    issueStatus: "pending",
    imageUrl:
      "https://res.cloudinary.com/ddzhczocz/image/upload/v1754926354/uploads/kwp7igzjgupl4tztccaq.webp",
    upvotedBy: [],
    comments: [],
    createdAt: "2025-08-11T15:32:35.370Z",
    updatedAt: "2025-08-11T15:32:35.370Z",
    __v: 0,
  },
  {
    issueCoordinates: {
      latitude: 16.5975,
      longitude: 74.1005,
    },
    _id: "689a0ae9e20bf0269b6d4ef8",
    issueId: "ISSUE112",
    issueTitle: "Garbag Dump",
    issueDepartment: "Garbage",
    reporterName: "Prakash Yadav",
    reporterPhone: 8210918083,
    reporterId: "6899a16d06ec9b0368554466",
    landmark: "near new market",
    issueStatus: "resolved",
    imageUrl:
      "https://res.cloudinary.com/ddzhczocz/image/upload/v1754925801/uploads/ofz4qz8vsfhh1ton3imf.avif",
    upvotedBy: [],
    comments: [],
    createdAt: "2025-08-11T15:23:21.444Z",
    updatedAt: "2025-08-11T15:23:21.444Z",
    __v: 0,
  },
  {
    issueCoordinates: {
      latitude: 18.49423,
      longitude: 74.01965,
    },
    _id: "689a0a94e20bf0269b6d4ef2",
    issueId: "ISSUE112",
    issueTitle: "Illegal Garbage Dump",
    issueDepartment: "Garbage",
    reporterName: "Prakash Yadav",
    reporterPhone: 8210918083,
    reporterId: "6899a16d06ec9b0368554466",
    landmark: "Near Taj Mahal",
    issueStatus: "pending",
    imageUrl:
      "https://res.cloudinary.com/ddzhczocz/image/upload/v1754925716/uploads/b9ucxpas5yzgoqmgtv69.jpg",
    upvotedBy: [],
    comments: [],
    createdAt: "2025-08-11T15:21:56.182Z",
    updatedAt: "2025-08-11T15:21:56.182Z",
    __v: 0,
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
                latitude: 18.49418, //userLocation.latitude,
                longitude: 74.01969, //userLocation.longitude,
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
          More Issues in Pune
        </h1>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Add dynamic cards here if needed */}
          {reports.map((issue, idx) => (
            <IssueCard
              key={idx}
              title={issue.issueTitle}
              image={issue.imageUrl}
              category={issue.issueDepartment}
              status={issue.issueStatus}
            />
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
