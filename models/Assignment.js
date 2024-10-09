const mongoose = require("mongoose");

// Define Assignment schema
const assignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  task: { type: String, required: true }, // Task description
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the Admin (User) model
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  }, // Status of the assignment
  timestamp: { type: Date, default: Date.now }, // Timestamp of the assignment creation
});

// Export the model
module.exports = mongoose.model("Assignment", assignmentSchema);
