const Review = require("../models/Review");

// @desc   Update a review (only by the review's owner)
// @route  PUT /api/reviews/:id
// @access Private
exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });

  // Only the user who wrote the review can update it
  if (String(review.user) !== String(req.user._id))
    return res.status(403).json({ error: "Not authorized" });

  // Update review fields if new values are provided
  review.rating = req.body.rating || review.rating;
  review.comment = req.body.comment || review.comment;
  await review.save();

  res.json(review);
};

// @desc   Delete a review (only by the review's owner)
// @route  DELETE /api/reviews/:id
// @access Private
exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });

  // Only the user who wrote the review can delete it
  if (String(review.user) !== String(req.user._id))
    return res.status(403).json({ error: "Not authorized" });

  await review.deleteOne();
  res.json({ message: "Review deleted" });
};
