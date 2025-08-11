import React from "react";
import { Link } from "react-router-dom";

function HeroIntro() {
  return (
    <div className="flex flex-col items-center justify-center p-5 mt-5 lg:p-10">
      <h1 className="text-3xl lg:text-5xl font-bold tracking-wide roboto">
        Report Local Issue,
      </h1>
      <h1 className="text-2xl lg:text-4xl lg:pt-2 font-bold tracking-wide text-blue-700">
        Make a Difference
      </h1>

      <p className="text-center text-gray-700 mt-8 tracking-wide text-lg">
        Help improve your community by reporting civic issues. Upload photos,
        track progress, and see real change happen
      </p>

      <div className="flex flex-col lg:flex-row gap-2 mt-7">
        <Link
          to={"/report"}
          className="bg-blue-700 roboto p-2 px-10 rounded-md text-lg text-white"
        >
          Report Issue
        </Link>
        <Link
          to={"/feed"}
          className="shadow-sm border border-gray-100 roboto text-lg p-2 px-10 rounded-md text-black "
        >
          View Issues
        </Link>
      </div>
    </div>
  );
}

export default HeroIntro;
