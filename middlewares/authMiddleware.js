const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config"); // Make sure you import config here

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.log("Token missing - returning 401");
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    console.log("Invalid token - returning 401");
    res.status(401).json({ error: "Invalid token" });
  }
};
