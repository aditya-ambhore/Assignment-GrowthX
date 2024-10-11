// Import the express module
const express = require("express");

// Import the authentication middleware
const authenticateToken = require("../middleware/auth.js");

// Import admin controller functions
const {
  registerAdmin,
  loginAdmin,
  getAssignments,
  acceptAssignment,
  rejectAssignment,
} = require("../controllers/adminController.js");

// Create an instance of the router
const router = express.Router();

// Route for admin registration
router.post("/register", registerAdmin);

// Route for admin login
router.post("/login", loginAdmin);

// Route to get all assignments for the admin, protected by authentication
router.get("/assignments", authenticateToken, getAssignments);

// Route to accept an assignment by ID
router.post("/assignments/:id/accept", acceptAssignment);

// Route to reject an assignment by ID
router.post("/assignments/:id/reject", rejectAssignment);

// Export the router to use in other parts of the application
module.exports = router;
