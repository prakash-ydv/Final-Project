import React from "react";

function IssueDetail(props) {
  return (
    <div className="p-5 lg:px-10 bg-white max-w-2xl mx-auto">
      {/* Image */}
      <div className="w-full h-64 overflow-hidden rounded-lg">
        <img
          src={props.image}
          alt="Issue"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <h1 className="text-xl font-bold text-gray-800">{props.title}</h1>

        {/* Status Badge */}
        <span className="inline-block py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
          {props.status}
        </span>

        <p className="text-gray-500 text-sm">📅 Date: 12/08/2025</p>
        <p className="text-gray-500 text-sm">📍 Address:{props.address}</p>
        <p className="text-gray-500 text-sm">🏷 Landmark: {props.landmark}</p>
      </div>
    </div>
  );
}

export default IssueDetail;
