const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
      trim: true,
      unique: true, // har department ka naam unique hoga
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    issues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue", // Reference to Issue model
      }
    ]
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
