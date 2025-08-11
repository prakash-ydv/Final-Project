import React from "react";

function IssueDetail() {
  return (
    <div className="p-5 lg:px-10 bg-white max-w-2xl mx-auto">
      
      {/* Image */}
      <div className="w-full h-64 overflow-hidden rounded-lg">
        <img
          src="https://cdn.pixabay.com/photo/2022/08/30/15/56/rubbish-7421380_1280.jpg"
          alt="Issue"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <h1 className="text-xl font-bold text-gray-800">
          Title of the Issue
        </h1>

        {/* Status Badge */}
        <span className="inline-block py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
          Pending
        </span>

        <p className="text-gray-500 text-sm">📅 Date: 12/08/2025</p>
        <p className="text-gray-500 text-sm">📍 Address: Street Name, City</p>
        <p className="text-gray-500 text-sm">🏷 Landmark: Near Park</p>
      </div>
    </div>
  );
}

export default IssueDetail;
