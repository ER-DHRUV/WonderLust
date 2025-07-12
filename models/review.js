const mongoose = require('mongoose');
const Shcema = mongoose.Schema;

const reviewSchema = new Shcema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Review', reviewSchema);

 