const Admin = require("../models/admin.model");
const Department = require("../models/department.model");
const Issue = require("../models/issue.model");
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

const changeStatus = async (req, res) => {
  try {
    const { id, status, department } = req.body;

    if (!id || !status || !department) {
      return res.status(400).json({ failed: "Something is missing" });
    }

    // Update the issue's status
    const issue = await Issue.findByIdAndUpdate(id, { status }, { new: true });

    if (!issue) {
      return res.status(404).json({ failed: "Issue not found" });
    }

    // If department is garbage, add the issue to its issues array
    if (department.toLowerCase() === "garbage") {
      const dept = await Department.findOneAndUpdate(
        { departmentName: "garbage" },
        { $addToSet: { issues: issue._id } }, // $addToSet ensures no duplicates
        { new: true }
      );

      if (!dept) {
        return res.status(404).json({ failed: "Garbage department not found" });
      }
    }

    res.json({ success: true, updated: issue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ failed: "Server error" });
  }
};

module.exports = {
  loginAdmin,
};
