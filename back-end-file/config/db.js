const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from root directory
dotenv.config({ path: '../.env' });

// Log environment variables for debugging (remove in production)
console.log('DB Configuration:');
console.log('- DB_USER:', process.env.DB_USER ? 'SET' : 'NOT SET');
console.log('- DB_HOST:', process.env.DB_HOST ? 'SET' : 'NOT SET');
console.log('- DB_NAME:', process.env.DB_NAME ? 'SET' : 'NOT SET');
console.log('- DB_PORT:', process.env.DB_PORT || 'NOT SET');

// Create a PostgreSQL connection pool with better error handling
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  // Add connection timeout
  connectionTimeoutMillis: 5000,
  // Add idle timeout
  idleTimeoutMillis: 30000,
  // Add SSL for production
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the database connection with better error handling
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.message);
    console.error('Error code:', err.code);
    console.error('Host attempted:', process.env.DB_HOST);
  } else {
    console.log('Database connected successfully!');
    console.log('Current time:', res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};