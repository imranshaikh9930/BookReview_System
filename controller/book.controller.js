const Book = require("../models/book.model.js");
const Review = require("../models/review.model.js");
const User = require("../models/user.model.js");
const createBook = async (req, res) => {
  try {
    // console.log(req.user.id);
    const { name, description, genre } = req.body;

    // console.log("Received data:", name, description, genre);

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newBook = new Book({
      name,
      description,
      image: req.file.path, // Cloudinary image URL
      genre,
      author: req.user.id,
    });

    await newBook.save();

    // ✅ Use proper response formatting
    res.status(201).json({
      message: "Book uploaded successfully",
      book: newBook,
    });
  } catch (err) {
    console.error("Error uploading book:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    // with pagination and optional filters by author and genre)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // optional filters by author and genre
     const filters = {};

    if (req.query.genre) {
      filters.genre = req.query.genre;
    }

    if (req.query.author) {
      filter.author = req.query.author;
    }
    const books = await Book.find(filters).skip(skip).limit(limit);

    const totalBooks = await Book.countDocuments(filters);
   
    // calculate total pages
   const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({
      totalPages: totalPages,
      currentPage: page,
      totalBooks: totalBooks,
      books,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getBookDetails = async (req, res) => {

  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Pagination for reviews
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalReviews = await Review.countDocuments({ book: id });

    const reviews = await Review.find({ book: id })
      .populate("user", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const ratingAggregate = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);

    const averageRating =
      ratingAggregate.length > 0
        ? parseFloat(ratingAggregate[0].avgRating.toFixed(1))
        : 0;

    res.status(200).json({
      book,
      averageRating,
      totalReviews,
      currentPage: page,
      totalPages: Math.ceil(totalReviews / limit),
      reviews,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchBooks = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, "i");

    // Find matching authors
    const matchingAuthors = await User.find({ name: regex }).select("_id");
    // console.log("matchingAuthors",matchingAuthors)
    const authorIds = matchingAuthors.map((author) => author._id);

    // Search books by name, genre, or matching author IDs
    const books = await Book.find({
      $or: [{ name: regex }, { genre: regex }, { author: { $in: authorIds } }],
    }).populate("author", "name email");

    res.status(200).json({ results: books });
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createBook, getAllBooks, getBookDetails, searchBooks };
