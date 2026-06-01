// Weather API Handler
// ENG-123 Implementation

const express = require('express');
const router = express.Router();

// Validate location input
const validateLocation = (location) => {
  if (!location || location.trim().length === 0) {
    throw new Error('Location cannot be empty');
  }
  if (location.length > 100) {
    throw new Error('Location name too long (max 100 chars)');
  }
  return location.trim();
};

// Get weather for a location
router.get('/api/weather/:location', (req, res) => {
  try {
    const location = validateLocation(req.params.location);
    
    // Mock weather data
    const weatherData = {
      location: location,
      temperature: Math.random() * 30,
      humidity: Math.random() * 100,
      condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
      timestamp: new Date().toISOString()
    };
    
    res.json(weatherData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Health check endpoint
router.get('/api/health', (req, res) => {
  res.json({ status: 'Weather API is running' });
});

module.exports = router;
