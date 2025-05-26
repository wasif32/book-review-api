const mongoose = require("mongoose");

// @desc Book schema definition
const bookSchema = new mongoose.Schema({
  title: String, // Title of the book
  author: String, // Author's name
  genre: String, // Genre or category
  description: String, // Short summary or description
});

module.exports = mongoose.model("Book", bookSchema);
