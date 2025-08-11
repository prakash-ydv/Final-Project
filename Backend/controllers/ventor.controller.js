const Vendor = require("../models/vendor.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Issue = require("../models/issue.model");

const saltRounds = 10;
const secret_key = process.env.SECRET_KEY;

const createVendor = async (req, res) => {
  try {
    const { name, phone, password, city, department } = req.body;

    // Basic check
    if (!name || !phone || !password || !city || !department) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if vendor exists
    const phone_existing = await Vendor.findOne({ phone });
    if (phone_existing) {
      return res.status(409).json({ error: "Vendor already exists." });
    }

    // hash pass
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new vendor
    const vendor = new Vendor({
      name,
      phone,
      password: hashedPassword,
      city,
      department,
    });

    await vendor.save();

    res.status(201).json({
      message: "Vendor created successfully",
      vendor: {
        name: vendor.name,
        phone: vendor.phone,
        city: vendor.city,
        department: vendor.department,
      },
    });
  } catch (err) {
    console.error("Vendor creation error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginVendor = async (req, res) => {
  console.log(req.body)
  const { phoneNo, password } = req.body;
  const phone = Number(phoneNo);

  try {
    const vendor = await Vendor.findOne({ phone });

    if (!vendor) {
      return res
        .status(404)
        .json({ failed: "login failed", message: "Vendor not found" });
    }

    const isPassMatched = await bcrypt.compare(password, vendor.password);

    if (isPassMatched && secret_key) {
      const token = jwt.sign(
        {
          phone: vendor.phone,
          _id: vendor._id,
          role: vendor.role,
        },
        secret_key
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "None",
        })
        .json({
          success: "login success",
          vendor: {
            name: vendor.name,
            role: vendor.role,
            city: vendor.city,
            department: vendor.department,
          },
        });
    } else {
      res.status(401).json({ status: "Wrong credentials" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ status: "Server error" });
  }
};

const logOutVendor = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: "logout success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Logout failed" });
  }
};

const myAssignedIssues = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.json({ failed: "Need login first" });

    const vendor = jwt.verify(token, secret_key); // contains _id
    const vendorDetails = await Vendor.findById(vendor._id);

    if (!vendorDetails) {
      return res.status(404).json({ failed: "Vendor not found" });
    }

    const issues = await Issue.find({ _id: { $in: vendorDetails.issueHandled } });

    res.json({ success: true, issues });
  } catch (err) {
    console.error(err);
    res.status(500).json({ failed: "Server error" });
  }
};

module.exports = { createVendor, loginVendor, logOutVendor, myAssignedIssues };
