import React from "react";

function RecentIssueCard({
  issueId = "IR-2024-015",
  title = "Water leak on Elm Street",
  priority = "high",
  location = "Elm Street & 3rd Ave",
  category = "Infrastructure",
  timeAgo = "10 minutes ago",
}) {
  const priorityColors = {
    high: "bg-red-100 text-red-600",
    medium: "bg-orange-100 text-orange-600",
    low: "bg-green-100 text-green-600",
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-6">
      {/* Left section */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">{issueId}</span>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${priorityColors[priority]}`}
          >
            {priority}
          </span>
        </div>

        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
          <span className="flex items-center gap-1">📍 {location}</span>
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
            {category}
          </span>
          <span>{timeAgo}</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>Reported</option>
          <option>Assigned</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Rejected</option>
        </select>

        <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>Assign to...</option>
          <option>Dept 1</option>
          <option>Dept 2</option>
        </select>

        <button className="px-4 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
          Save
        </button>
      </div>
    </div>
  );
}

export default RecentIssueCard;
