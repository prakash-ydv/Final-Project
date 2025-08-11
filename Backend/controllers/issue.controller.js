const Issue = require("../models/issue.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const User = require("../models/user.model");
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

    // 🧾 Step 6: Create and save issue to DB
    const issue = new Issue({
      issueId: "ISSUE112", // TODO: generate dynamically
      issueTitle,
      issueDepartment,
      reporterName: user.name,
      reporterId: user._id,
      reporterPhone: user.phone,
      issueDesc,
      landmark,
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

module.exports = {
  reportIssue,
  findIssue,
};
