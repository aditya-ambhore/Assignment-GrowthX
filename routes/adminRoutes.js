const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getAssignments,
  acceptAssignment,
  rejectAssignment,
} = require("../controllers/adminController.js");

const router = express.Router();

// Route for admin registration
router.post("/register", registerAdmin);

// Route for admin login
router.post("/login", loginAdmin);

// Route to get all assignments for the admin
router.get("/assignments", getAssignments);

// Route to accept an assignment
router.patch("/assignments/:id/accept", acceptAssignment);

// Route to reject an assignment
router.patch("/assignments/:id/reject", rejectAssignment);

// Export the router
module.exports = router;
