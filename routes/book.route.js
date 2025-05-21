const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {createBook,getAllBooks,getBookDetails,searchBooks} = require("../controller/book.controller")
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.post("/books",authMiddleware,upload.single("image"),createBook)
router.get("/books",authMiddleware,getAllBooks)
router.get("/books/:id",authMiddleware,getBookDetails);
router.get("/search",searchBooks);


module.exports = router;