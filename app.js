const express = require("express");
const connectDB = require("./config");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const app = express();
const bodyParser = require("body-parser");

connectDB();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
