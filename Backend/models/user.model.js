const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "user",
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
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    issueReported: [mongoose.Schema.Types.ObjectId],
    civicScore: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
