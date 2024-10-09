const express = require("express");
const {
  registerUser,
  loginUser,
  uploadAssignment,
  getAdmins,
} = require("../controllers/userController.js");

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for uploading an assignment
router.post("/upload", uploadAssignment);

// Route to get all admins
router.get("/admins", getAdmins);


router.get("/register", (req, res) => {
  res.send("<h1>Register Page</h1>");
});
router.get("/login", (req, res) => {
  res.send("<h1>Login Page</h1>");
});
router.get("/upload", (req, res) => {
  res.send("<h1>Upload Page</h1>");
});
router.get("/admins", (req, res) => {
  res.send("<h1>Admin Page</h1>");
});

// Export the router
module.exports = router;
