const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const cors = require("cors");
const { testRoute, verifyLogin } = require("./controllers/test.controller");
const connectToDB = require("./models/db.connection");

// controllers
const {
  createUser,
  loginUser,
  logOutUser,
  myReportsDetails,
} = require("./controllers/user.controller");
const {
  reportIssue,
  findIssue,
  getAllIssues,
} = require("./controllers/issue.controller");
const { loginAdmin } = require("./controllers/admin.controller");
const verifyToken = require("./middlewares/verify.token");
const {
  createVendor,
  loginVendor,
  logOutVendor,
} = require("./controllers/ventor.controller");
const { createDepartment } = require("./controllers/department.controller");
const { sendOTP, verifyOTP } = require("./controllers/auth.controllers");
const User = require("./models/user.model");

// middle wares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json()); //to parse json
const upload = multer({ dest: "uploads/" });

// connect to DB
const DB_URL = process.env.DB_URL;
connectToDB(DB_URL);

app.get("/", testRoute);
app.post("/", verifyToken, verifyLogin);

// auth (OTP)
// send mail
app.post("/user/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.json({
      failed: "no email found",
    });
  await sendOTP(email);
  res.json({ success: true, message: "OTP sent successfully" });
});

app.post("/user/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const isValid = verifyOTP(email, otp);

    if (!isValid) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // OTP valid, update user
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { isVerified: true } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "OTP verified", user });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// user routes
app.post("/user/register", createUser);
app.post("/user/login", loginUser);
app.get("/user/logout", logOutUser);

// admin routes
app.get("/admin/login", loginAdmin);

// main action routes
app.post("/issue/report", upload.single("image"), reportIssue);
app.post("/issue/find", findIssue);
app.get("/user/myreports", myReportsDetails);
app.get("/issues/getall", getAllIssues);

//vendor routes
app.post("/vendor/register", createVendor);
app.post("/vendor/login", loginVendor);
app.get("/vendor/logout", logOutVendor);

// department
app.post("/department/register", createDepartment);

const PORT = process.env.PORT;
app.listen(8080, () => {
  console.log(`server running at PORT ${8080}`);
});
