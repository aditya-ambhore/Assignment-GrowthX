// Import the mongoose module
const mongoose = require("mongoose");

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  // Username must be unique and is required
  username: { type: String, required: true, unique: true },

  // Password is required
  password: { type: String, required: true },

  // Role can be 'user' or 'admin', default is 'admin'
  role: { type: String, default: "admin" },
});

// Export the Admin model based on the adminSchema
module.exports = mongoose.model("Admin", adminSchema);
