const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

function testRoute(req, res) {
  res.json({
    status: "running",
  });
}
async function verifyLogin(req, res) {
  const token = req.cookies?.token;
  let userData;

  if (token) {
    const tokenData = jwt.verify(token, SECRET_KEY);
    console.log("phone : ", tokenData.phone);
    const phone = tokenData.phone;
    userData = await User.findOne({ phone });
    console.log("Token Velidation Run");
  }
  res.json({
    status: "running",
    user: {
      name: userData.name,
      role: userData.role,
      phone: userData.phone,
      city: userData.city,
      issueReported: userData.issueReported,
    },
  });
}

module.exports = {
  testRoute,
  verifyLogin,
};
