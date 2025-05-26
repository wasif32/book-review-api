const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// Route to handle user signup (registration)
router.post("/signup", signup);

// Route to handle user login (authentication)
router.post("/login", login);

module.exports = router;
