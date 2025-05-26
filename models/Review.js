const mongoose = require("mongoose");

// @desc Review schema definition
const reviewSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" }, // Reference to Book
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
    rating: Number, // Star rating (e.g., 1 to 5)
    comment: String, // Optional written feedback
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Review", reviewSchema);
