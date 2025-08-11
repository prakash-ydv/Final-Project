import React from "react";

function DashBoardIssueCard() {
  return (
    <div className="flex gap-2 border border-gray-300 rounded-lg py-2 ">
      <div className="w-1/3">
        <img
          src="https://cdn.pixabay.com/photo/2022/08/30/15/56/rubbish-7421380_1280.jpg"
          alt=""
          className="object-cover bg-cover"
        />
      </div>
      <div className="text-sm lg:text-md roboto">
        <h1 className="">Title of the Issue</h1>
        <span>Pending</span>
        <p>12/08/2025</p>
        <span>ID : P1208001</span>
      </div>
    </div>
  );
}

export default DashBoardIssueCard;
