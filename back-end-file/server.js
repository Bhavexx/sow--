const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true, // Allow requests from any origin
  credentials: true
}));
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// User routes
app.use('/api/users', require('./routes/users'));

// Purchase routes
app.use('/api/purchases', require('./routes/purchases'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});