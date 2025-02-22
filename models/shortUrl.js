const mongoose = require('mongoose');
const shortId = require('shortid');


// Create a new schema for the short URL
const shortUrlSchema = new mongoose.Schema({
    full: { // The full URL
        type: String,
        required: true
    },
    short: { // The short URL
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: { // The number of clicks the short URL has received
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema); // Export the model