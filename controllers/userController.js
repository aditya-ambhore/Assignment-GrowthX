const User = require("../models/User.js");
const Assignment = require("../models/Assignment.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role: "user",
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error); // Log the error for debugging
    res.status(500).json({ message: "Error registering user" });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Generate JWT token with user information
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "secret_key", // Use environment variable for the secret
      { expiresIn: "1h" }
    );

    // Return the token and success message
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};


//Upload Assignment
const uploadAssignment = async (req, res) => {
  const { userId, task, adminId } = req.body;

  // Check if all required fields are provided
  if (!userId || !task || !adminId) {
    return res
      .status(400)
      .json({ message: "All fields (userId, task, adminId) are required." });
  }

  try {
    const newAssignment = new Assignment({ userId, task, adminId });

    // Attempt to save the assignment to the database
    await newAssignment.save();

    res.status(201).json({ message: "Assignment uploaded successfully." });
  } catch (error) {
    // Log the error for debugging purposes (optional)
    console.error("Error saving assignment:", error);

    // Return a specific error message based on the error type
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Validation error: " + error.message });
    } else {
      res
        .status(500)
        .json({ message: "Error uploading assignment: " + error.message });
    }
  }
};

// Fetch All Admins
const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("username");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins" });
  }
};

// Export all functions
module.exports = {
  registerUser,
  loginUser,
  uploadAssignment,
  getAdmins,
};
