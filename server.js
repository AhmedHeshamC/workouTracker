const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet'); // Added
const rateLimit = require('express-rate-limit'); // Added
const apiRoutes = require('./routes/index'); // Main API router

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Security Middleware
app.use(helmet()); // Set various security HTTP headers

// Rate Limiting - Apply to all API requests
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter); // Apply limiter to API routes

// CORS Middleware
// TODO: Configure CORS more restrictively for production environments
// Example: app.use(cors({ origin: 'YOUR_FRONTEND_URL' }));
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Body Parsing Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// TODO: Implement input validation using express-validator in routes/controllers

// Database connection (imported in controllers/models where needed)
// require('./config/db'); // Ensure DB connection is attempted at startup

// Mount API routes with versioning
app.use('/api/v1', apiRoutes);

// Basic root route
app.get('/', (req, res) => {
  res.send('Workout Tracker API Running');
});

// TODO: Add more robust error handling middleware

// Start server only if this script is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the app instance for testing
module.exports = app;
