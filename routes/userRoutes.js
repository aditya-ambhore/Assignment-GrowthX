// Import the express module
const express = require("express");

// Import the controller functions for user-related operations
const {
  registerUser,
  loginUser,
  uploadAssignment,
  getAdmins,
} = require("../controllers/userController.js");

// Create an instance of the router
const router = express.Router();

// Import passport for authentication
const passport = require("passport");

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for uploading an assignment
router.post("/upload", uploadAssignment);

// Route to get all admins, secured with JWT
router.get("/admins", getAdmins);

// Export the router for use in other parts of the application
module.exports = router;
