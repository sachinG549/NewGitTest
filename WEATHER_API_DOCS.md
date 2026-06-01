# Weather API Documentation

## ENG-123: Weather API Implementation

### Endpoints

#### 1. Get Weather
**Endpoint:** `GET /api/weather/:location`

**Parameters:**
- `location` (string, required): City or location name

**Response:**
```json
{
  "location": "London",
  "temperature": 15.3,
  "humidity": 65.2,
  "condition": "Cloudy",
  "timestamp": "2026-06-01T10:30:00.000Z"
}
```

**Error Response:**
```json
{
  "error": "Location cannot be empty"
}
```

#### 2. Health Check
**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "Weather API is running"
}
```

### Usage Example

```javascript
const axios = require('axios');

async function getWeather(location) {
  try {
    const response = await axios.get(`/api/weather/${location}`);
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data.error);
  }
}

getWeather('London');
```

### Implementation Notes
- Validates location input (max 100 characters)
- Returns mock weather data
- Includes timestamp for all responses
- Graceful error handling with proper HTTP status codes

---

**Ticket:** ENG-123  
**Status:** Implementation complete
