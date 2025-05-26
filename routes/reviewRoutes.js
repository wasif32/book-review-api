const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.put("/:id", auth, updateReview);
router.delete("/:id", auth, deleteReview);

module.exports = router;
