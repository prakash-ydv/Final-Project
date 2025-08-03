import React from "react";

function StatCard(props) {
  const { value, label, subtitle, color, subtitleColor } = props;
  return (
    <>
      <div className="flex flex-col items-center justify-center shadow-md p-4 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg">
        <h1 className={`font-bold text-2xl sm:text-3xl ${color}`}>{value}</h1>
        <p className="text-base sm:text-lg font-medium mt-1 text-gray-800">
          {label}
        </p>
        <small className={`text-xs sm:text-sm mt-1 ${subtitleColor}`}>
          {subtitle}
        </small>
      </div>
    </>
  );
}

export default StatCard;
