import React, { useState } from "react";

const categories = [
  "Pothole",
  "Garbage",
  "Streetlight",
  "Water Leak",
  "Noise",
  "Other",
];

function ReportIssueForm() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const toggleCategory = (category) => {
    setSelectedCategories(() => category);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 px-5 py-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-2"> Report an Issue</h1>
      <p className="text-center text-gray-600 mb-6">
        Help improve your community by reporting local problems
      </p>

      <form className="flex flex-col gap-6">
        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />

          {/* Preview Image */}
          {previewImage && (
            <div className="mt-2">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Location Input */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Location</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter location manually or fetch"
              className="flex-1 border p-2 rounded"
            />
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Fetch
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Additional Details</label>
          <textarea
            rows="4"
            placeholder="Provide additional details about the issue..."
            className="border p-2 rounded resize-none"
          />
        </div>

        {/* Category Selection */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Select Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-4 py-1 rounded-full border ${
                  selectedCategories.includes(cat)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default ReportIssueForm;
