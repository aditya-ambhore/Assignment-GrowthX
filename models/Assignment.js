// Import the mongoose module
const mongoose = require("mongoose");

// Define the Assignment schema
const assignmentSchema = new mongoose.Schema({
  // Reference to the User model (for the user assigned to the task)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Task description is required
  task: { type: String, required: true },

  // Reference to the User model (for the admin managing the assignment)
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Status of the assignment with possible values
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"], // Allowed status values
    default: "pending", // Default status is pending
  },

  // Timestamp of assignment creation, defaults to the current date and time
  timestamp: { type: Date, default: Date.now },
});

// Export the Assignment model based on the assignmentSchema
module.exports = mongoose.model("Assignment", assignmentSchema);
