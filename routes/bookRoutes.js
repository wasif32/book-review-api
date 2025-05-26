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

router.post("/", auth, addBook);
router.get("/", getBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.post("/:id/reviews", auth, addReview);

module.exports = router;
