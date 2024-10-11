// Import required module
const express = require("express");
const mongoose = require("mongoose");
const passport = require("./middleware/passport.js");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Initialize Passport for authentication
app.use(passport.initialize());

// Define  routes
app.use("/users", userRoutes);
app.use("/admins", adminRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
