import React, { useState, useEffect } from "react";
import { FiUploadCloud, FiMapPin, FiSend } from "react-icons/fi";
import { reportIssue } from "../../api/issueOperations";
import { useNavigate } from "react-router-dom";

function ReportIssueForm() {
  const navigate = useNavigate();
  // form data
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [location, setLocation] = useState("Fetching location...");
  const [locationExtra, setLocationExtra] = useState("");
  const [locationError, setLocationError] = useState("");

  // form handle states
  const [submitButtonText, setSubmitButtonText] = useState("Report Issue");

  const categories = [
    "Pothole",
    "Garbage",
    "Streetlight",
    "Water Leak",
    "Noise",
    "Other",
  ];

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    setLocation("Fetching location...");
    setLocationError("");

    if (!navigator.geolocation) {
      setLocation("Geolocation not supported.");
      setLocationError("Your browser does not support location services.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(
          `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`
        );
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocation("Permission denied.");
          setLocationError(
            "Location access denied. Please enable it from your browser settings."
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocation("Location unavailable.");
          setLocationError("Unable to determine your location.");
        } else if (error.code === error.TIMEOUT) {
          setLocation("Request timed out.");
          setLocationError("Fetching location timed out. Try again.");
        } else {
          setLocation("Location error.");
          setLocationError("An unknown error occurred.");
        }
      }
    );
  };

  // handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  async function uploadIssue(e) {
    console.log("uploading...");
    e.preventDefault();

    if (!location || !image || !issueTitle || !selectedCategory) return;
    console.log("upload in process");

    // change string location to number
    const [latStr, lngStr] = location
      .replace("Lat: ", "")
      .replace("Lng: ", "")
      .split(", ");

    const latitude = parseFloat(latStr);
    const longitude = parseFloat(lngStr);
    setSubmitButtonText("Uploading...");
    const response = await reportIssue(
      image,
      issueTitle,
      selectedCategory,
      latitude,
      longitude,
      locationExtra
    );

    if (response.success) {
      setSubmitButtonText("Uploaded");
      navigate("/");
      setSubmitButtonText("Report Issue");
    } else {
      setSubmitButtonText("Failed to Upload");
      setTimeout(() => {
        setSubmitButtonText("Report Issue");
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-1">Report an Issue</h1>
        <p className="text-center text-gray-500 mb-6">
          Help improve your city by reporting local problems
        </p>

        <form onSubmit={(e) => uploadIssue(e)} className="space-y-6">
          {/* Image Upload Section */}
          <div>
            <label className="text-base font-medium flex items-center gap-2 mb-2">
              <FiUploadCloud className="text-xl" />
              Upload Issue Photo
            </label>
            <div
              className="border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400"
              onClick={() => document.getElementById("fileInput").click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto h-48 object-contain"
                />
              ) : (
                <>
                  <FiUploadCloud className="text-4xl mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm text-gray-700">
                    Choose File
                  </span>
                </>
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Auto-Fetched Location */}
          <div>
            <label className="block font-medium mb-1">Your Location</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <input
                type="text"
                value={location}
                readOnly
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 outline-none"
              />
              <button
                type="button"
                onClick={fetchLocation}
                className="px-4 text-blue-600 hover:text-blue-800"
                title="Refresh location"
              >
                <FiMapPin size={20} />
              </button>
            </div>
            {locationError && (
              <p className="text-sm text-red-600 mt-1">{locationError}</p>
            )}
          </div>
          {/* Additional Location Info */}
          <div className="mt-4">
            <label className="block font-medium mb-1">Landmark</label>
            <input
              type="text"
              required
              placeholder="e.g., Near temple, beside post office"
              value={locationExtra}
              onChange={(e) => setLocationExtra(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 outline-none"
            />
          </div>
          {/* Issue Title */}
          <div className="mt-4">
            <label className="block font-medium mb-1"> Issue Title</label>
            <input
              onChange={(e) => setIssueTitle(e.target.value)}
              value={issueTitle}
              spellCheck={false}
              type="text"
              required
              placeholder="e.g., Roadside garbage dump"
              className="w-full border rounded-lg px-4 py-2 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">
              Description <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              minLength={10}
              value={issueDesc}
              onChange={(e) => setIssueDesc(e.target.value)}
              spellCheck={false}
              placeholder="Provide additional details about the issue..."
              rows="4"
              className="w-full border rounded-lg p-3 outline-none resize-none"
            />
          </div>

          {/* Category Selection (Single Select) */}
          <div>
            <label className="block font-medium mb-2">Issue Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1 rounded-full border transition ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <FiSend />
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssueForm;
