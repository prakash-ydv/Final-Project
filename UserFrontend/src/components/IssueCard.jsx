import React from "react";

function IssueCard(props) {
  const { image, title, category,status } = props;
  return (
    <div className="flex flex-col w-full sm:w-[300px] md:w-[340px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative">
      <div className="h-48 overflow-hidden">
        <img src={image} alt="Issue" className="object-cover w-full h-full" />
      </div>
      {/* category */}
      <span className="absolute text-center w-22 top-2 left-2 bg-blue-500 rounded-2xl p-1 text-xs text-white">
        {category}
      </span>
      <div className="p-4 flex flex-col gap-2">
        <h5 className="text-lg font-semibold">{title}</h5>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            Reports: <strong>14</strong>
          </span>
          <span className="w-30 text-center bg-yellow-200 px-2 py-0.5 rounded-full text-xs">
            Status: {status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default IssueCard;
