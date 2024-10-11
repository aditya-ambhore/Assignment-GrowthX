// Import the mongoose module
const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
    // Username must be unique and is required
    username: { type: String, required: true, unique: true },

    // Password is required
    password: { type: String, required: true },

    // Role can be 'user' or 'admin', default is 'user'
    role: { type: String, default: "user" },
});

// Export the User model based on the userSchema
module.exports = mongoose.model("User", userSchema);
