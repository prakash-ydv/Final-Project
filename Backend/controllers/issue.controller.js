const Issue = require("../models/issue.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const User = require("../models/user.model");
const { getAddressFromCoords } = require("../utils/getAddressFromCords");
const { generateRandom5Digit } = require("../utils/generateId");
SECRET_KEY = process.env.SECRET_KEY;

// config
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const reportIssue = async (req, res) => {
  console.log(req.body);
  try {
    // 🔒 Step 1: Check for token in cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "User not logedIn" });
    }

    // 🔍 Step 2: Verify token
    let decodedUser;
    try {
      decodedUser = jwt.verify(token, SECRET_KEY);
      console.log(decodedUser);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // 📦 Step 3: Destructure and validate request body
    const {
      issueTitle,
      issueDepartment,
      latitude,
      longitude,
      issueDesc,
      landmark,
    } = req.body;

    if (!issueTitle || !issueDepartment || !latitude || !longitude) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: "Invalid latitude or longitude" });
    }

    // 🖼️ Step 4: Upload image to Cloudinary
    const filePath = req.file?.path;
    if (!filePath) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads",
    });

    // 🧹 Step 5: Delete local file after upload
    fs.unlinkSync(filePath);

    const user = await User.findOne({ _id: decodedUser._id });
    // get address
    const issueAddress = await getAddressFromCoords(lat, lon);
    const issueId = "P" + generateRandom5Digit();
    // 🧾 Step 6: Create and save issue to DB
    const issue = new Issue({
      issueId,
      issueTitle,
      issueDepartment,
      reporterName: user.name,
      reporterId: user._id,
      reporterPhone: user.phone,
      issueDesc,
      landmark,
      issueAddress,
      issueCoordinates: {
        latitude: lat,
        longitude: lon,
      },
      imageUrl: result.secure_url,
    });

    const reportedIssue = await issue.save();

    // add the issue to user's reported list
    await User.findByIdAndUpdate(
      user._id,
      {
        $push: { issueReported: reportedIssue._id },
      },
      { new: true }
    );

    // 🎉 Step 7: Respond with success
    return res.status(201).json({
      success: "issue reported",
      imageUrl: result.secure_url,
      issueId: reportedIssue._id,
    });
  } catch (err) {
    console.error("Error reporting issue:", err.message);
    return res.status(500).json({
      status: "error",
      message: "Failed to report issue",
      details: err.message,
    });
  }
};

const findIssue = async (req, res) => {
  const { issueId } = req.body;
  if (!issueId)
    return res.json({
      failed: "problem Id not Found",
    });

  const issueDetails = await Issue.findOne({ issueId });
  if (issueDetails) {
    res.json({ success: "issueFound", data: issueDetails });
  } else {
    res.json({
      failed: "issue not found",
    });
  }
};

// get all issues

const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 }); // latest first
    if (!issues || issues.length === 0) {
      return res.status(404).json({ error: "No issues found" });
    }

    return res.status(200).json({
      success: true,
      count: issues.length,
      data: issues,
    });
  } catch (err) {
    console.error("Error fetching all issues:", err.message);
    return res.status(500).json({
      error: "Failed to fetch issues",
      details: err.message,
    });
  }
};

const getAllGarbageIssues = async (req, res) => {
  try {
    const garbageIssues = await Issue.find({ issueDepartment: "Garbage" }).sort(
      { createdAt: -1 }
    );

    if (!garbageIssues || garbageIssues.length === 0) {
      return res.status(404).json({ error: "No garbage issues found" });
    }

    return res.status(200).json({
      success: true,
      count: garbageIssues.length,
      data: garbageIssues,
    });
  } catch (err) {
    console.error("Error fetching garbage issues:", err.message);
    return res.status(500).json({
      error: "Failed to fetch garbage issues",
      details: err.message,
    });
  }
};

const getOneIssueByParam = async (req, res) => {
  const { issueId } = req.params;

  if (!issueId) return res.status(400).json({ error: "Issue ID required" });

  try {
    const issue = await Issue.findOne({ issueId });
    if (!issue) return res.status(404).json({ error: "Issue not found" });

    return res.status(200).json({ success: true, data: issue });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  reportIssue,
  findIssue,
  getAllIssues,
  getAllGarbageIssues,
  getOneIssueByParam,
};
