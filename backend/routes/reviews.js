const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');

// Get reviews for a book
router.get('/book/:bookId', async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.bookId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new review
router.post('/', async (req, res) => {
    const review = new Review({
        bookId: req.body.bookId,
        rating: req.body.rating,
        review: req.body.review
    });

    try {
        const newReview = await review.save();
        
        // Update book's average rating
        const reviews = await Review.find({ bookId: req.body.bookId });
        const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
        
        await Book.findByIdAndUpdate(req.body.bookId, {
            averageRating: avgRating
        });

        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router; 