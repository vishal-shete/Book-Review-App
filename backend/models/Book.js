const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    yearOfPublication: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', BookSchema); 