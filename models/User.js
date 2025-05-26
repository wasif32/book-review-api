const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// @desc User schema definition
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Username is mandatory
    unique: true, // Must be unique across all users
  },
  password: {
    type: String,
    required: true, // Password is mandatory
  },
});

// Hash password before saving if it was modified or is new
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare provided password with hashed password stored
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
