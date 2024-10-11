const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // Check if token is provided
  if (!token) {
    return res.status(403).json({ message: "Access denied." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");

    // Attach the adminId from the token to the request object
    req.adminId = decoded.adminId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    res.status(400).json({ message: "Invalid token." });
  }
};

// Export the middleware for use in other parts of the application
module.exports = authenticateToken;
