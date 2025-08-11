const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    issueId: {
      type: String,
      required: true,
      default: "P1108001",
    },
    issueTitle: {
      type: String,
      required: true,
    },
    issueDepartment: {
      type: String,
      required: true,
    },
    issueDesc: {
      type: String,
    },
    reporterName: {
      type: String,
      required: true,
    },
    reporterPhone: {
      type: Number,
      required: false,
    },
    reporterId: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
    issueCoordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    issueStatus: {
      type: String,
      default: "pending",
      lowercase : true
    },

    imageUrl: {
      type: String,
    },
    upvotedBy: [],
    comments: [],
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue;
