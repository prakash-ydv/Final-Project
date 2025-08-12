import { useState } from "react";

function UpdateStatus({ currentStatus = "Pending", onUpdate }) {
  const [status, setStatus] = useState(currentStatus);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [buttonText, setButtonText] = useState("Update Status");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "Resolved" && !imageFile) {
      alert("Please upload an image to mark issue as Resolved.");
      return;
    }

    if (onUpdate) {
      setIsSubmitting(true);
      setButtonText("Updating...");

      try {
        // Wait for the parent's onUpdate to finish
        await onUpdate({ status, imageFile });
      } catch (error) {
        alert("Failed to update status: " + error.message);
      } finally {
        setIsSubmitting(false);
        setButtonText("Update Status");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // preview URL
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
          disabled={isSubmitting}
        >
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>

        {status === "Resolved" && (
          <div className="border border-dotted border-gray-400 rounded-lg h-42 flex flex-col items-center justify-center relative overflow-hidden">
            <input
              required
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="opacity-0 h-full w-full absolute cursor-pointer"
              disabled={isSubmitting}
            />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm text-center px-2">
                Click picture from same angle
              </span>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg text-sm sm:text-base transition ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default UpdateStatus;
