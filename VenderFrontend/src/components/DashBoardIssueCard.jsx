import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DashBoardIssueCard(props) {
  const [issueId, setIssueId] = useState(props.issueId || null);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/issue")}
      className="flex gap-3 border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
    >
      {/* Image Section */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={props.imageUrl}
          alt="Issue"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between text-sm lg:text-base roboto w-full">
        <div>
          <h1 className="font-semibold text-gray-800 truncate">
            {props.title}
          </h1>
          <span className="inline-block px-2 py-0.5 mt-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
            {props.status}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-500 text-xs mt-2">
          <p>12/08/2025</p>
          <span className="font-medium text-gray-700">{props.issueId}</span>
        </div>
      </div>
    </div>
  );
}

export default DashBoardIssueCard;
