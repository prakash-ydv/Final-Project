import React from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          CityFix User SignUp
        </h1>
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Jhony Sinc"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="number"
              min={10}
              maxLength={10}
              placeholder="9876543210"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              Email
            </label>
            <input
              type="number"
              placeholder="jhony@gmail.com"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              City
            </label>
            <input
              type="text"
              placeholder="Bhopal"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have a account?{" "}
          <Link
            to={"/login"}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
