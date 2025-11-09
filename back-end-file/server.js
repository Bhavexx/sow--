const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: '../.env' });

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true, // Allow requests from any origin
  credentials: true
}));
app.use(express.json());

// Serve static files from the React app build directory
const distPath = path.join(__dirname, '..', 'front-end-file', 'dist');
console.log('Looking for frontend files in:', distPath);

// Check if dist directory exists
if (fs.existsSync(distPath)) {
  console.log('Frontend build directory found');
  app.use(express.static(distPath));
  
  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.log('Frontend build directory NOT found');
  // Fallback route if frontend files don't exist
  app.get(/.*/, (req, res) => {
    res.status(200).json({ 
      message: 'Backend server is running, but frontend files are not built yet',
      instructions: 'Run "npm run build" to build the frontend'
    });
  });
}

// API routes with error handling
try {
  // User routes
  app.use('/api/users', require('./routes/users'));

  // Purchase routes
  app.use('/api/purchases', require('./routes/purchases'));
} catch (error) {
  console.log('API routes not available due to database connection issues');
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err.message);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err.message);
});