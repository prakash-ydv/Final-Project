import React from "react";
import NavBar from "../components/NavBar";
import MapComponent from "../components/MapComponent";
import Footer from "../components/Footer";

function IssuePage() {
  const issue = {
    title: "Tree is fallen in mid of Road",
    description:
      "A large tree branch has fallen and is blocking the main road. It's causing traffic congestion and needs to be removed immediately.",
    imageUrl:
      "https://thumbs.dreamstime.com/b/fallen-tree-branch-road-strong-storm-13458011.jpg",
    reportedBy: "Prakash Kumar",
    dateReported: "2025-08-05 11:24 AM",
    category: "Fallen Tree",
    status: "Pending",
    timeline: ["Reported", "In Review", "Pending Action"],
    location: {
      latitude: 23.6454,
      longitude: 73.5454,
    },
  };

  return (
    <>
      <NavBar />
      <div className="px-5 lg:px-10">
        <div className="border border-gray-200 shadow-md rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row h-auto gap-5">
            {/* issue details */}
            <div className="flex flex-col gap-4 p-5 w-full lg:w-1/2">
              <div className="w-full h-64 rounded-2xl overflow-hidden">
                <img
                  src={issue.imageUrl}
                  alt="issue"
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-2xl font-semibold">{issue.title}</h1>
              <p className="text-gray-700">{issue.description}</p>

              <div className="text-sm mt-2 text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Reported by:</span>{" "}
                  {issue.reportedBy}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {issue.dateReported}
                </p>
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {issue.category}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      issue.status === "Pending"
                        ? "bg-yellow-500"
                        : issue.status === "Resolved"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {issue.status}
                  </span>
                </p>
              </div>

              {/* Timeline */}
              <div className="mt-4">
                <h2 className="text-lg font-medium mb-2">Issue Timeline</h2>
                <div className="flex items-center gap-4">
                  {issue.timeline.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          index === 0
                            ? "bg-green-500"
                            : index === 1
                            ? "bg-yellow-400"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      {index < issue.timeline.length - 1 && (
                        <div className="w-10 h-1 bg-gray-300 mx-2"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-10 mt-2 text-sm text-gray-600">
                  {issue.timeline.map((step, index) => (
                    <span key={index}>{step}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* map */}
            <div className="w-full lg:w-1/2 h-[300px] lg:h-[80vh] overflow-hidden p-5">
              <MapComponent location={issue.location} />
            </div>
          </div>
        </div>

        <section className="mt-10">
            <Footer />
        </section>
      </div>
    </>
  );
}

export default IssuePage;
