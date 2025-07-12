const express= require('express');
const router = express.Router({ mergeParams: true }); 
const wrapAsync = require('../utils/wrapAsync.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const {validateReview,isLoggedIn,isReviewAthor} = require('../middleware.js');
const reviewController = require('../controllers/review.js');

// post review route
router.post('/',isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//delete review route
router.delete('/:reviewId',isLoggedIn,isReviewAthor, wrapAsync(reviewController.destroyReview));

module.exports = router;