const Review = require("../models/review.model");
const Book = require("../models/book.model");
const avgRatings = require("../helper/avgRatings");
const addReviews = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    // console.log(bookId);

    // check books exist or not
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // check user already reviewed this book

    const existingReview = await Review.findOne({ book: bookId, user: userId });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this book" });
    }

    //create new Review

    const review = await Review.create({
      book: bookId,
      user: userId,
      rating,
      comment,
    });

    book.reviews.push(review._id);

    // updating avg rating

    const allReviews = await Review.find({ book: bookId });

    const avgRating =
      allReviews.length > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        : 0;

    book.rating = avgRating;

    await book.save();

    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateReviews = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    // check for already have review

    const existing = await Review.findOne({ book: bookId, user: userId });

    if (!existing) {
      return res.status(400).json({ message: "No Review to Update" });
    }

    existing.rating = rating;
    existing.comment = comment;

    await existing.save();

    //  create Helper to avoid duplicate code
    const allReviews = await Review.find({ book: bookId });
      const averageRating = avgRatings(remainingReviews);

    const book = await Book.findById(bookId);
    book.rating = averageRating;
    await book.save();

    res.status(200).json({ message: "Review updated successfully" });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(id);

    // console.log(review);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    //    console.log(userId.toString());
    // check same review belongs to same author
    if (review.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this review" });
    }

    const bookId = review.book;

    await review.deleteOne();

    // remove review id from book review Array

    await Book.findByIdAndUpdate(bookId, {
      $pull: { reviews: review._id },
    });

    //calculate avg rating for book

    const remainingReviews = await Review.find({ book: bookId });
    const averageRating = avgRatings(remainingReviews);

    // update rating

    await Book.findByIdAndUpdate(bookId, { rating: averageRating });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = { addReviews, updateReviews, deleteReviews };
