const User = require("../models/User.js");
const Admin = require("../models/Admin.js");
const Assignment = require("../models/Assignment.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin Registration
const registerAdmin = async (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body
  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already registered" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save(); // Save the new admin to the database
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    // Handle errors during registration
    res
      .status(500)
      .json({ message: "Error registering admin", error: error.message });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body
  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate a JWT token for the admin
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || "secret_key", // Use a secret key from the environment or a default one
      { expiresIn: "1h" } // Set token expiration
    );
    res.json({ token });
  } catch (error) {
    // Handle errors during login
    res
      .status(500)
      .json({ message: "Error logging in admin", error: error.message });
  }
};

// View Assignments Tagged to Admin
const getAssignments = async (req, res) => {
  const adminId = req.adminId; // Get admin ID from the request
  console.log(`Fetching assignments for adminId: ${adminId}`);

  if (!adminId) {
    return res.status(400).json({ message: "Admin ID is missing." });
  }

  try {
    // Fetch assignments for the admin and populate user information
    const assignments = await Assignment.find({ adminId })
      .populate("userId", "username")
      .exec();
    console.log(assignments);
    res.json(assignments);
  } catch (error) {
    // Handle errors during fetching assignments
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching assignments", error: error.message });
  }
};

// Accept Assignment
const acceptAssignment = async (req, res) => {
  const assignmentId = req.params.id; // Get assignment ID from request parameters
  try {
    // Update assignment status to accepted
    const assignment = await Assignment.findByIdAndUpdate(assignmentId, {
      status: "accepted",
    });
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    res.json({ message: "Assignment accepted" });
  } catch (error) {
    // Handle errors during accepting assignment
    res
      .status(500)
      .json({ message: "Error accepting assignment", error: error.message });
  }
};

// Reject Assignment
const rejectAssignment = async (req, res) => {
  const assignmentId = req.params.id; // Get assignment ID from request parameters
  try {
    // Update assignment status to rejected
    const assignment = await Assignment.findByIdAndUpdate(assignmentId, {
      status: "rejected",
    });
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    res.json({ message: "Assignment rejected" });
  } catch (error) {
    // Handle errors during rejecting assignment
    res
      .status(500)
      .json({ message: "Error rejecting assignment", error: error.message });
  }
};

// Export all functions for use in other modules
module.exports = {
  registerAdmin,
  loginAdmin,
  getAssignments,
  acceptAssignment,
  rejectAssignment,
};
