import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 px-6 rounded-t-3xl">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Your City. Your Voice. Your Power.
        </h2>
        <p className="text-sm sm:text-base max-w-xl text-gray-100">
          Found an issue in your neighborhood? Report it in seconds and help build a smarter, cleaner city. Real impact starts with you.
        </p>
        <Link
          to="/report"
          className="mt-4 bg-white text-blue-700 hover:bg-blue-800 hover:text-white transition-all px-5 py-2 rounded-full font-medium shadow-md"
        >
          Report an Issue
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
