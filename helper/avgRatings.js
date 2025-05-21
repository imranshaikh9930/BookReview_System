
function avgRatings(remainingReviews){
  const averageRating =
      remainingReviews.length > 0
        ? remainingReviews.reducer((sum, num) => sum + num.rating, 0) /
          remainingReviews
        : 0;

    return averageRating
}

module.exports = avgRatings;