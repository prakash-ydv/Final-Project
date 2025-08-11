import React, { useState, useEffect, useRef } from "react";
import {
  FiUploadCloud,
  FiMapPin,
  FiSend,
  FiCheck,
  FiRefreshCw,
} from "react-icons/fi";
import { reportIssue } from "../../api/issueOperations";
import { useNavigate } from "react-router-dom";
import * as tmImage from "@teachablemachine/image";

function ReportIssueForm() {
  const navigate = useNavigate();

  // form data
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [predictedCategory, setPredictedCategory] = useState(null);
  const [predictionConfidence, setPredictionConfidence] = useState(0);
  const [location, setLocation] = useState("Fetching location...");
  const [locationExtra, setLocationExtra] = useState("");
  const [locationError, setLocationError] = useState("");
  const [submitButtonText, setSubmitButtonText] = useState("Report Issue");
  const [isPredicting, setIsPredicting] = useState(false);
  const [privicy, setPrivicy] = useState(false);

  // AI model state
  const [model, setModel] = useState(null);
  const imgRef = useRef(null);

  const categories = [
    "Pothole",
    "Garbage",
    "Streetlight",
    "Water Leak",
    "Noise",
    "Other",
  ];

  // Load Teachable Machine model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelURL =
          "https://teachablemachine.withgoogle.com/models/Sj65OmLd7/model.json";
        const metadataURL =
          "https://teachablemachine.withgoogle.com/models/Sj65OmLd7/metadata.json";
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
      } catch (error) {
        console.error("Failed to load model:", error);
      }
    };
    loadModel();
    fetchLocation();
  }, []);

  // Predict category when image changes
  useEffect(() => {
    const predictCategory = async () => {
      if (preview && model && imgRef.current) {
        setIsPredicting(true);
        try {
          // Wait for image to load
          await new Promise((resolve) => {
            if (imgRef.current.complete) resolve();
            else imgRef.current.onload = resolve;
          });

          // Perform prediction
          const predictions = await model.predict(imgRef.current);
          const sortedPredictions = [...predictions].sort(
            (a, b) => b.probability - a.probability
          );
          const topPrediction = sortedPredictions[0];

          // Update predicted category and confidence
          setPredictedCategory(topPrediction.className);
          setPredictionConfidence(Math.round(topPrediction.probability * 100));

          // Auto-select category if confidence > 50%
          if (topPrediction.probability > 0.5) {
            setSelectedCategory(topPrediction.className);
          }
        } catch (error) {
          console.error("Prediction error:", error);
        } finally {
          setIsPredicting(false);
        }
      }
    };

    predictCategory();
  }, [preview, model]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePreviewURL = URL.createObjectURL(file);
      setPreview(imagePreviewURL);
      setImage(file);
      // Reset prediction state
      setPredictedCategory(null);
      setPredictionConfidence(0);
      setIsPredicting(true); // Start prediction immediately
    }
  };

  async function uploadIssue(e) {
    e.preventDefault();

    if (!location || !image || !issueTitle || !selectedCategory) return;

    const [latStr, lngStr] = location
      .replace("Lat: ", "")
      .replace("Lng: ", "")
      .split(", ");

    const latitude = parseFloat(latStr);
    const longitude = parseFloat(lngStr);
    setSubmitButtonText("Uploading...");

    try {
      const response = await reportIssue(
        image,
        issueTitle,
        selectedCategory,
        latitude,
        longitude,
        locationExtra,
        issueDesc
      );

      if (response.success) {
        setSubmitButtonText("Uploaded");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setSubmitButtonText("Failed to Upload");
      }
    } catch (error) {
      setSubmitButtonText("Error Uploading");
      console.error("Upload error:", error);
    } finally {
      setTimeout(() => {
        setSubmitButtonText("Report Issue");
      }, 2000);
    }
  }

  // privicy
  function changePrivicy() {
    setPrivicy((prev) => !prev);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-1">Report an Issue</h1>
        <p className="text-center text-gray-500 mb-6">
          Help improve your city by reporting local problems
        </p>

        <form onSubmit={uploadIssue} className="space-y-6">
          {/* Image Upload Section */}
          <div>
            <label className="text-base font-medium flex items-center gap-2 mb-2">
              <FiUploadCloud className="text-xl" />
              Upload Issue Photo
              {isPredicting && (
                <span className="flex items-center text-sm text-blue-600 ml-auto">
                  <FiRefreshCw className="animate-spin mr-1" />
                  AI is analyzing image...
                </span>
              )}
            </label>
            <div
              className={`border border-dashed rounded-lg p-6 text-center cursor-pointer relative ${
                isPredicting
                  ? "border-blue-400"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              onClick={() => document.getElementById("fileInput").click()}
            >
              {preview ? (
                <>
                  <img
                    ref={imgRef}
                    src={preview}
                    alt="Preview"
                    className="mx-auto h-48 object-contain"
                  />
                  {isPredicting && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <div className="text-white text-center">
                        <FiRefreshCw className="animate-spin mx-auto text-2xl mb-2" />
                        <p>AI is detecting issue...</p>
                      </div>
                    </div>
                  )}
                </>
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
            <label className="block font-medium mb-1">Issue Title</label>
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

          {/* Category Selection */}
          <div>
            <label className="block font-medium mb-2">Issue Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1 rounded-full border transition flex items-center gap-1 ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300"
                  } ${
                    predictedCategory === cat ? "ring-2 ring-green-400" : ""
                  }`}
                >
                  {cat}
                  {predictedCategory === cat && selectedCategory === cat && (
                    <FiCheck className="text-white" />
                  )}
                </button>
              ))}
            </div>

            {isPredicting ? (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <FiRefreshCw className="animate-spin mr-2" />
                Detecting issue category...
              </div>
            ) : predictedCategory ? (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  AI detected:{" "}
                  <span className="font-medium">{predictedCategory}</span>
                  <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {predictionConfidence}% confidence
                  </span>
                </p>
                {selectedCategory !== predictedCategory && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(predictedCategory)}
                    className="text-sm text-blue-600 hover:text-blue-800 mt-1 flex items-center"
                  >
                    <FiCheck className="mr-1" />
                    Use detected category
                  </button>
                )}
              </div>
            ) : null}
          </div>
          <div>
            <button
              onClick={() => changePrivicy()}
              className={`text-xs border border-gray-300 p-2 rounded-2xl outline-none ${
                privicy ? "bg-green-400 text-white" : "bg-none"
              }`}
            >
              Report Anonymously
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            disabled={submitButtonText !== "Report Issue" || isPredicting}
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
