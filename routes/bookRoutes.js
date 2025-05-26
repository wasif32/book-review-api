const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  addBook,
  getBooks,
  getBookById,
  searchBooks,
  addReview,
} = require("../controllers/bookController");

// Route to add a new book (protected, requires authentication)
router.post("/", auth, addBook);

// Route to get the list of all books (public)
router.get("/", getBooks);

// Route to search books by query parameters (public)
router.get("/search", searchBooks);

// Route to get details of a specific book by its ID (public)
router.get("/:id", getBookById);

// Route to add a review to a specific book by its ID (protected, requires authentication)
router.post("/:id/reviews", auth, addReview);

module.exports = router;
