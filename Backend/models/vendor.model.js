const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "vendor",
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      required: true,
    },
    issueHandled: [],
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
