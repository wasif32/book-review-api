const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// Enable Cross-Origin Resource Sharing to allow requests from other domains
app.use(cors());

// Parse incoming JSON requests and make data available in req.body
app.use(express.json());

// Routes for authentication (signup, login)
app.use("/api/auth", authRoutes);

// Routes for book-related operations (CRUD, search, reviews)
app.use("/api/books", bookRoutes);

// Routes for review-related operations (update, delete reviews)
app.use("/api/reviews", reviewRoutes);

// Connect to MongoDB using URI from config file
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the server only after successful DB connection
    app.listen(config.PORT || 5000, () => {
      console.log("Server is running and connected to DB");
    });
  })
  .catch((err) => console.error("DB connection error:", err));
