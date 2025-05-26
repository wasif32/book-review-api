const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config"); // Load secret key from env

// @desc   Middleware to protect routes using JWT authentication
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1]; // Expecting format: "Bearer <token>"

  if (!token) {
    console.log("Token missing - returning 401");
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    // Verify JWT and attach user info to request object
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    console.log("Invalid token - returning 401");
    res.status(401).json({ error: "Invalid token" });
  }
};
