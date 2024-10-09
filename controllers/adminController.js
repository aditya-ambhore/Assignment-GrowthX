const User = require("../models/User.js");
const Assignment = require("../models/Assignment.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin Registration
const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      username,
      password: hashedPassword,
      role: "admin",
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error: error.message });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET || "secret_key", // Use environment variable for secret key
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in admin", error: error.message });
  }
};

// View Assignments Tagged to Admin
const getAssignments = async (req, res) => {
  const adminId = req.adminId;
  try {
    const assignments = await Assignment.find({ adminId })
      .populate("userId", "username")
      .exec();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error: error.message });
  }
};

// Accept Assignment
const acceptAssignment = async (req, res) => {
  const assignmentId = req.params.id;
  try {
    const assignment = await Assignment.findByIdAndUpdate(assignmentId, { status: "accepted" });
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.json({ message: "Assignment accepted" });
  } catch (error) {
    res.status(500).json({ message: "Error accepting assignment", error: error.message });
  }
};

// Reject Assignment
const rejectAssignment = async (req, res) => {
  const assignmentId = req.params.id;
  try {
    const assignment = await Assignment.findByIdAndUpdate(assignmentId, { status: "rejected" });
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.json({ message: "Assignment rejected" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting assignment", error: error.message });
  }
};

// Export all functions
module.exports = {
  registerAdmin,
  loginAdmin,
  getAssignments,
  acceptAssignment,
  rejectAssignment,
};
