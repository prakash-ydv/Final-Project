import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

function VerifyEmail() {
  const { user, setUser } = useUser();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log(user.email);
      if (data.success) {
        setOtpSent(true);
        setTimer(60);
        setMessage("OTP sent! Check your email.");
        setOtp("");
      } else {
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      setMessage("Failed to send OTP. Try again.");
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setError("");
    // verify mail
    const response = await fetch("http://localhost:8080/user/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, otp }),
    });
    const data = await response.json();
    if (data.success) {
      console.log("Email Verified", data);
      setUser(data);
      alert("Email Verified");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          {otpSent ? "Verify OTP" : "Send OTP"}
        </h2>

        {!otpSent && (
          <>
            <p className="mb-6 text-gray-600">
              Click the button below to receive a 6-digit OTP on your email.
            </p>
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-semibold transition duration-300"
              disabled={timer > 0}
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}
            </button>
          </>
        )}

        {otpSent && (
          <>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
              placeholder="Enter 6-digit OTP"
              className="w-full border border-gray-300 rounded-md p-3 text-center text-2xl tracking-widest focus:outline-blue-500 mb-4"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg font-semibold transition duration-300 mb-4"
            >
              Verify OTP
            </button>

            <button
              onClick={handleSendOtp}
              disabled={timer > 0}
              className={`w-full border ${
                timer > 0
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              } py-2 rounded-md text-sm transition duration-300`}
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </>
        )}

        {message && <p className="mt-4 text-sm text-blue-700">{message}</p>}
      </div>
    </div>
  );
}

export default VerifyEmail;
