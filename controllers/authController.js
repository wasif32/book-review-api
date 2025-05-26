const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

// @desc   Register a new user
// @route  POST /api/auth/signup
// @access Public
exports.signup = async (req, res) => {
  try {
    // Create new user with hashed password (handled in model)
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    // Handle validation errors (e.g., duplicate username)
    res.status(400).json({ error: err.message });
  }
};

// @desc   Login user and return JWT token
// @route  POST /api/auth/login
// @access Public
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ username });

  // Validate password
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, config.jwtSecret, {
    expiresIn: "1d",
  });

  // Return token to client
  res.json({ token });
};
