import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");

  // login function
  async function handleLogin(e) {
    e.preventDefault();
    if (!phoneNo || !password) {
      alert("Please enter both phone number and password.");
      return;
    }

    try {
      const response = await loginUserApi(phoneNo, password);
      console.log("Login success:", response);
      if (response.success) {
        setIsLogedIn(true);
        setUser(response.user);
        console.log("isLogedIn is True");
        navigate("/");
      } else {
        console.log("isLogedIn is false");
      }
      // Store token, redirect, etc.
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid phone number or password");
    }
    setPhoneNo("");
    setPassword("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          CityFix Vendor Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              onChange={(e) => setPhoneNo(e.target.value)}
              value={phoneNo}
              type="number"
              placeholder="Enter Phone Number"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
