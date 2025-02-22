const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl'); // Import the ShortUrl model

// Create an Express application
const app = express();


// Connect to MongoDB
mongoose.connect('mongodb://localhost/urlShortener', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies


app.get('/', async(req, res) => {
    const shortenUrl = await ShortUrl.find(); // Find all short URLs in the database
    res.render('index', { shortenUrl: shortenUrl }); // Render the index.ejs file with the short URLs
}); // Render the index.ejs file when the user visits the root URL

app.post('/shortenUrl', async(req, res) => {
    // Handle the POST request
   await ShortUrl.create({ full: req.body.fullUrl });
   res.redirect('/');
});

app.get('/:shortUrl', async(req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl }); // Find the short URL in the database
    if(shortUrl == null) return res.sendStatus(404); // If the short URL doesn't exist in the database, return a 404 status
    shortUrl.clicks++; // Increment the number of clicks
    shortUrl.save(); // Save the updated short URL
    res.redirect(shortUrl.full); // Redirect to the full URL
}); // Redirect to the full URL when the user visits the short URL

app.listen(process.env.PORT || 3000); // Server is listening on port 3000 or the port specified in the environment variable 