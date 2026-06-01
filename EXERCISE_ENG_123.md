# 🏋️ Practical Exercise: ENG-123 Complete Workflow

## Exercise: Implement a Feature Following Company Standards

### Your Scenario:
You have a JIRA ticket **ENG-123: Implement Weather API** and need to:
1. Create a feature branch
2. Make meaningful commits linked to the ticket
3. Push to remote
4. Create a PR
5. Merge back to main

---

## Exercise Steps (Do This Now!)

### ✅ Step 1: Setup - Back to Main Branch

```bash
git checkout main
git pull origin main
git status
```

**Expected Output:**
```
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

---

### ✅ Step 2: Create Feature Branch for ENG-123

```bash
# Create branch following company standard
git checkout -b feature/ENG-123-weather-api

# Verify you're on the right branch
git branch
```

**Expected Output:**
```
  main
* feature/ENG-123-weather-api
```

---

### ✅ Step 3: First Change - Create API Handler

Create a new file `weather-api.js`:

```bash
cat > weather-api.js <<'EOF'
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
EOF
```

**Commit this change:**

```bash
git add weather-api.js
git commit -m "ENG-123: Create weather API endpoint handler"

# See your commit
git log --oneline -1
```

**Expected Output:**
```
abc1234 ENG-123: Create weather API endpoint handler
```

---

### ✅ Step 4: Second Change - Add Error Handling

Update `weather-api.js` to add more robust error handling:

```bash
cat > weather-api.js <<'EOF'
// Weather API Handler
// ENG-123 Implementation

const express = require('express');
const router = express.Router();

// Validate location
const validateLocation = (location) => {
  if (!location || location.trim().length === 0) {
    throw new Error('Location cannot be empty');
  }
  if (location.length > 50) {
    throw new Error('Location name too long');
  }
  return location.trim();
};

// Get weather for a location
router.get('/api/weather/:location', (req, res) => {
  try {
    const location = validateLocation(req.params.location);
    
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
EOF
```

**Commit this change:**

```bash
git add weather-api.js
git commit -m "ENG-123: Add input validation and error handling"

# See your commits
git log --oneline -3
```

**Expected Output:**
```
def5678 ENG-123: Add input validation and error handling
abc1234 ENG-123: Create weather API endpoint handler
xyz7890 Added Weather app core functionality
```

---

### ✅ Step 5: Third Change - Add Documentation

Create `WEATHER_API.md`:

```bash
cat > WEATHER_API.md <<'EOF'
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
- Validates location input
- Returns mock weather data
- Includes timestamp for all responses
- Handles errors gracefully

---

*Implemented as part of ENG-123*
EOF
```

**Commit this change:**

```bash
git add WEATHER_API.md
git commit -m "ENG-123: Add comprehensive API documentation"

# See all your commits
git log --oneline -5
```

---

### ✅ Step 6: Check Your Work

```bash
# See what files you've created/changed
git status

# See diff from main
git diff main

# See all commits on your feature branch
git log --oneline main..feature/ENG-123-weather-api
```

---

### ✅ Step 7: Push to Remote

```bash
# First time pushing - use -u to set upstream
git push -u origin feature/ENG-123-weather-api

# Verify
git log --oneline -1
git branch -vv
```

**Expected Output:**
```
feature/ENG-123-weather-api abc1234 [origin/feature/ENG-123-weather-api] ENG-123: Add comprehensive API documentation
```

---

### ✅ Step 8: Simulate Code Review Updates

Let's say a reviewer asks: *"Add rate limiting info to docs"*

```bash
# Make the update
cat >> WEATHER_API.md <<'EOF'

### Rate Limiting
- 100 requests per minute per IP
- Returns 429 status if exceeded

EOF

# Commit the review feedback
git add WEATHER_API.md
git commit -m "ENG-123: Add rate limiting documentation per review feedback"

# Push the update
git push origin feature/ENG-123-weather-api

# See updated history
git log --oneline -3
```

---

### ✅ Step 9: Merge to Main (Squash)

```bash
# Switch to main
git checkout main

# Ensure main is updated
git pull origin main

# Merge feature branch (squash all commits into one)
git merge --squash feature/ENG-123-weather-api

# Verify the changes are staged
git status

# Commit with clear message
git commit -m "ENG-123: Implement Weather API with validation and docs"

# Push to main
git push origin main

# Verify
git log --oneline -2
```

**Expected Output:**
```
abc1234 ENG-123: Implement Weather API with validation and docs
xyz9999 Added Weather app core functionality
```

---

### ✅ Step 10: Clean Up Your Feature Branch

```bash
# Delete local branch
git branch -d feature/ENG-123-weather-api

# Delete remote branch
git push origin --delete feature/ENG-123-weather-api

# Verify it's gone
git branch -a
```

---

## 🎯 What You've Learned

✅ Creating a feature branch with ticket ID  
✅ Making logical commits linked to JIRA  
✅ Pushing to remote with upstream tracking  
✅ Updating based on review feedback  
✅ Merging with squash for clean history  
✅ Cleaning up merged branches  

---

## What Happens in JIRA?

After Step 7 (push to remote), in your JIRA ticket ENG-123, you'll see:

**Development Section:**
- ✅ Branch: `feature/ENG-123-weather-api`
- ✅ Commits: 4 commits linked
- ✅ Status: Automatically updates based on branch

After Step 9 (merged to main):
- ✅ Status: Changes to "In Progress" → "In QA/Review"
- ✅ All commits visible in ticket

---

## Real-World Tips

1. **Commit Frequency**: Commit after each logical unit of work (not every line)
2. **Commit Messages**: Always include ticket ID at the start
3. **Push Often**: Don't wait until the end to push
4. **Sync with Main**: If main changes, sync your feature branch:
   ```bash
   git fetch origin
   git rebase origin/main
   # or
   git merge origin/main
   ```
5. **Never Force Push** to shared branches (only to your feature branch if needed)

