const Department = require("../models/department.model");

const createDepartment = async (req, res) => {
  try {
    const { departmentName, city } = req.body;

    // Validate inputs
    if (!departmentName || !city) {
      return res.status(400).json({ error: "Department name and city are required." });
    }

    // Check if department already exists in the same city
    const existingDept = await Department.findOne({ departmentName, city });
    if (existingDept) {
      return res.status(409).json({ error: "Department already exists in this city." });
    }

    // Create new department
    const department = new Department({
      departmentName,
      city,
      issues: [] // Initially empty
    });

    await department.save();

    res.status(201).json({
      message: "Department created successfully.",
      department
    });
  } catch (error) {
    console.error("Error creating department:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createDepartment };
