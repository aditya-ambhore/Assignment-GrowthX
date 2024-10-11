// Import required modules
const { Strategy, ExtractJwt } = require("passport-jwt");
const Admin = require("../models/Admin.js");
const passport = require("passport");
require("dotenv").config(); // Load environment variables from .env file

// Configure options for JWT authentication
const opts = {
  // Extract JWT from Authorization header as Bearer token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Secret key for verifying the token
  secretOrKey: process.env.JWT_SECRET,
};

// Use the JWT strategy for authentication
passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      // Find the admin based on the adminId in the JWT payload
      const admin = await Admin.findById(jwt_payload.adminId);
      if (admin) {
        // If admin is found, return it
        return done(null, admin);
      }
      // If admin is not found, return false
      return done(null, false);
    } catch (err) {
      // Handle any errors during the process
      return done(err, false);
    }
  })
);

// Export the configured passport instance for use in other parts of the application
module.exports = passport;
