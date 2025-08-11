import React, { useState } from "react";

function UpdateStatus({ currentStatus = "Pending", onUpdate }) {
  const [status, setStatus] = useState(currentStatus);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate({ status, image });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4 sm:p-5 bg-white rounded-lg border border-gray-300 shadow-sm w-full max-w-sm mx-auto">
      <h2 className="text-base sm:text-lg font-semibold mb-3 text-center sm:text-left">
        Update Issue Status
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-sm sm:text-base"
        >
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Show image upload only if status is Completed */}
        {status === "Resolved" && (
          <div className="border border-dotted border-gray-400 rounded-lg h-42 flex flex-col items-center justify-center relative overflow-hidden">
            <input
              required
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="opacity-0 h-full w-full absolute cursor-pointer"
            />
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm text-center px-2">
                Click or Drag & Drop to upload a picture of the same place
              </span>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Update Status
        </button>
      </form>
    </div>
  );
}

export default UpdateStatus;
