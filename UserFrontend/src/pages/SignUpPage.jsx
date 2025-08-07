import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { registerUserApi } from "../api/userOperations";

function SignUpPage() {
  const navitage = useNavigate();

  const [resiterButtonText, setRegisteredButtonText] = useState("Register");
  const { setIsLogedIn, setUser } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  async function signUpRequest(e) {
    e.preventDefault();
    console.log(name, email, password, city, phoneNo);
    if (!name || !email || !password || !city || !phoneNo) return;
    setRegisteredButtonText("Creating User...");
    const response = await registerUserApi(
      name,
      email,
      password,
      city,
      phoneNo
    );

    if (response.success) {
      console.log("user registered");
      setIsLogedIn(true);
      setUser(response.user);
      navitage("/");
      setRegisteredButtonText("Register");
    }

    setName("");
    setEmail("");
    setPassword("");
    setCity("");
    setPhoneNo("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          CityFix User SignUp
        </h1>
        <form
          onSubmit={(e) => signUpRequest(e)}
          className="flex flex-col space-y-4"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder="Golu Kumar"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              required
              value={phoneNo}
              onChange={(e) => {
                const val = e.target.value;
                // Allow only digits and limit to 10 characters
                if (/^\d{0,10}$/.test(val)) {
                  setPhoneNo(val);
                }
              }}
              type="text"
              inputMode="numeric"
              pattern="\d{10}"
              placeholder="9876543210"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jhony@gmail.com"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              City
            </label>
            <input
              required
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Bhopal"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">
              Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {resiterButtonText}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have a account?{" "}
          <Link
            to={"/login"}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
