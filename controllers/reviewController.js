const Review = require("../models/Review");

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });
  if (String(review.user) !== String(req.user._id))
    return res.status(403).json({ error: "Not authorized" });

  review.rating = req.body.rating || review.rating;
  review.comment = req.body.comment || review.comment;
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found" });
  if (String(review.user) !== String(req.user._id))
    return res.status(403).json({ error: "Not authorized" });

  await review.deleteOne();
  res.json({ message: "Review deleted" });
};
