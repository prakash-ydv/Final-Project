const Admin = require("../models/admin.model");
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await Admin.findOne({ email });

    // pass check login here
  } catch (error) {
    res.json({
      status: "login failed",
      details: error,
    });
  }
};

module.exports = {
  loginAdmin,
};
