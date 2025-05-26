const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

// Route to update a review by its ID (protected, requires authentication)
router.put("/:id", auth, updateReview);

// Route to delete a review by its ID (protected, requires authentication)
router.delete("/:id", auth, deleteReview);

module.exports = router;
