const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://adityaambhore06:googler12345@cluster.vflo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
    )
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};
module.exports = connectDB;
