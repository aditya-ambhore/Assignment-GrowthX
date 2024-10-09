const mongoose = require("mongoose");

// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username must be unique and required
  password: { type: String, required: true }, // Password is required
  role: { type: String, enum: ["user", "admin"], required: true }, // Role can be 'user' or 'admin' and is required
});

// Export the model
module.exports = mongoose.model("User", userSchema);
