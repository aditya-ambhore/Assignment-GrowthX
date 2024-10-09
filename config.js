require("dotenv").config();

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

module.exports = connectDB;
