const Book = require("../models/Book");
const Review = require("../models/Review");

// @desc   Add a new book
// @route  POST /api/books
// @access Private (Authenticated users only)
exports.addBook = async (req, res) => {
  try {
    // Create a book from request body
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc   Get all books with optional filters and pagination
// @route  GET /api/books
// @access Public
exports.getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const filter = {};

  // Add optional filters for author and genre (case-insensitive)
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(books);
};

// @desc   Get book details by ID with reviews and average rating
// @route  GET /api/books/:id
// @access Public
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    // Get reviews for the book (limit to 10, include username)
    const reviews = await Review.find({ book: book._id })
      .populate("user", "username")
      .limit(10);

    // Calculate average rating using aggregation
    const avgRating = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: "$book", avgRating: { $avg: "$rating" } } },
    ]);

    res.json({
      book,
      averageRating: avgRating[0]?.avgRating || 0,
      reviews,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc   Add a review for a book (only once per user)
// @route  POST /api/books/:id/reviews
// @access Private (Authenticated users only)
exports.addReview = async (req, res) => {
  // Check if user has already reviewed the book
  const existing = await Review.findOne({
    user: req.user._id,
    book: req.params.id,
  });
  if (existing) return res.status(400).json({ error: "Already reviewed" });

  // Create new review
  const review = await Review.create({
    book: req.params.id,
    user: req.user._id,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  res.status(201).json(review);
};

// @desc   Search books by title or author
// @route  GET /api/books/search?q=...
// @access Public
exports.searchBooks = async (req, res) => {
  const { q } = req.query;

  // Case-insensitive search on title or author
  const books = await Book.find({
    $or: [{ title: new RegExp(q, "i") }, { author: new RegExp(q, "i") }],
  });

  res.json(books);
};
