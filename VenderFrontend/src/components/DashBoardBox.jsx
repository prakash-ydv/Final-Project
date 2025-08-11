import React from "react";

function DashBoardBox(props) {
  return (
    <div className={`${props.color} text-white p-5 rounded-lg`}>
      <h1 className="font-semibold text-2xl">{props.title}</h1>
      <h1 className="text-3xl font-bold">{props.stat}</h1>
    </div>
  );
}

export default DashBoardBox;
