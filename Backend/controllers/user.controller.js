const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const Issue = require("../models/issue.model");
const saltRounds = 10;
const secret_key = process.env.SECRET_KEY;

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, city, phone } = req.body;

    // Basic check
    if (!name || !email || !phone || !password || !city) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if user exists
    const phone_existing = await User.findOne({ phone });
    const email_existing = await User.findOne({ email });
    if (phone_existing || email_existing) {
      return res.status(409).json({ error: "User already exists." });
    }

    // hash pass
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (!err) {
          // Store hash in your password DB.
          const user = new User({ name, email, password: hash, phone, city });
          // Save user
          await user.save();
        }
      });
    });

    const user = {
      name,
      email,
      city,
      phone,
    };

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error("User creation error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { phoneNo, password } = req.body;
  const phone = Number(phoneNo);
  console.log(req.body);

  try {
    const data = await User.findOne({ phone });
    console.log("data", data);

    if (!data) {
      return res
        .status(404)
        .json({ failed: "login failed", message: "User not found" });
    }

    const isPassMatched = await bcrypt.compare(password, data.password);

    if (isPassMatched && secret_key) {
      const token = jwt.sign(
        {
          phone: data.phone,
          _id: data._id,
        },
        secret_key
      );

      // send user data to frontend
      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "None",
          secure: true, // Use only if you're on HTTPS
        })
        .json({
          success: "login success",
          user: {
            name: data.name,
            role: data.role,
            email: data.email,
            issueReported: data.issueReported,
            city: data.city,
          },
        });
    } else {
      res.status(401).json({
        status: "Wrong credentials",
      });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      status: "Server error",
    });
  }
};

const logOutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      success: "logout success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Logout failed" });
  }
};

// get report details

async function myReportsDetails(req, res) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.json({ failed: "Need login first" });

    const user = jwt.verify(token, secret_key); // contains _id, phone
    const userDetails = await User.findById(user._id);

    if (!userDetails) {
      return res.status(404).json({ failed: "User not found" });
    }

    // Get issue IDs from the user
    const issueIds = userDetails.issueReported;

    // Fetch the issues using $in
    const issues = await Issue.find({ _id: { $in: issueIds } });

    res.json({ success: true, issues });
  } catch (err) {
    console.error(err);
    res.status(500).json({ failed: "Server error" });
  }
}

module.exports = { createUser, loginUser, logOutUser, myReportsDetails };
