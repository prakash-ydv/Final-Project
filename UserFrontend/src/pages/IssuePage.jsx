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
    location: {
      latitude: 23.6454,
      longitude: 73.5454,
    },
    // Updated timeline with dates/times
    timeline: [
      {
        label: "Reported",
        time: "2025-08-05 11:24 AM",
        description: "Issue reported by resident",
      },
      {
        label: "Review Started",
        time: "2025-08-05 02:15 PM",
        description: "Assigned to inspection team",
      },
      {
        label: "Pending Action",
        time: "2025-08-06 09:30 AM",
        description: "Awaiting equipment availability",
      },
      {
        label: "Resolution",
        time: "—",
        description: "Scheduled for clearance",
      },
    ],
  };

  // Determine current status index for timeline highlighting
  const statusIndex = issue.timeline.findIndex((item) =>
    item.label.toLowerCase().includes(issue.status.toLowerCase())
  );

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
            </div>

            {/* map */}
            <div className="w-full lg:w-1/2 h-[300px] lg:h-[80vh] overflow-hidden p-5">
              <MapComponent location={issue.location} />
            </div>

            {/* Timeline Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Issue Timeline</h2>

              <div className="relative pl-8 border-l-2 border-gray-200">
                {issue.timeline.map((step, index) => (
                  <div
                    key={index}
                    className={`mb-6 relative ${
                      index === issue.timeline.length - 1 ? "pb-0" : "pb-2"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute w-4 h-4 rounded-full -left-[9px] top-1 ${
                        index <= statusIndex
                          ? "bg-green-500 border-2 border-green-600"
                          : "bg-gray-300 border-2 border-gray-400"
                      }`}
                    ></div>

                    <div className="ml-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-gray-800">
                          {step.label}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {step.time}
                        </span>
                        {index <= statusIndex && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {index === statusIndex
                              ? "Current Status"
                              : "Completed"}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
