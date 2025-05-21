const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {addReviews,updateReviews,deleteReviews} = require("../controller/review.controller");
const router = express.Router();

router.post("/:id/reviews",authMiddleware,addReviews)
router.put("/reviews/:id",authMiddleware,updateReviews)
router.delete("/reviews/:id",authMiddleware,deleteReviews)

module.exports = router;
