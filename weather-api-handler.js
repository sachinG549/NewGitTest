// Weather API Handler
// ENG-123 Implementation

const express = require('express');
const router = express.Router();

// Get weather for a location
router.get('/api/weather/:location', (req, res) => {
  const location = req.params.location;
  
  if (!location) {
    return res.status(400).json({ error: 'Location required' });
  }
  
  // Mock weather data
  const weatherData = {
    location: location,
    temperature: Math.random() * 30,
    humidity: Math.random() * 100,
    condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
    timestamp: new Date().toISOString()
  };
  
  res.json(weatherData);
});

module.exports = router;
