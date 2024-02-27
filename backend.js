server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
exports.app = app;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB setup
mongoose.connect('mongodb://localhost/weatherApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// City Model
const City = mongoose.model('City', { name: String });

// Weather API Key
const apiKey = 'YOUR_API_KEY';

// Save favorite city
app.post('/api/favorites', (req, res) => {
  const { cityName } = req.body;
  const newCity = new City({ name: cityName });
  newCity.save()
    .then(city => res.json(city))
    .catch(err => res.status(400).json({ message: 'Error saving city' }));
});

const port = process.env.PORT || 5000;
exports.port = port;

