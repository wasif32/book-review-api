// Load environment variables from .env file into process.env
require("dotenv").config();

module.exports = {
  // Server port, default to 5000 if not specified in environment
  port: process.env.PORT || 5000,

  // MongoDB connection URI from environment variables
  mongoURI: process.env.MONGO_URI,

  // Secret key for signing JWT tokens, keep this private
  jwtSecret: process.env.JWT_SECRET,
};
