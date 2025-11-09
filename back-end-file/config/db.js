const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from root directory
dotenv.config({ path: '../.env' });

// Create a PostgreSQL connection pool with better error handling
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // Add connection timeout
  connectionTimeoutMillis: 5000,
  // Add idle timeout
  idleTimeoutMillis: 30000,
});

// Test the database connection with better error handling
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.message);
    console.error('Error code:', err.code);
    console.error('Error detail:', err.detail);
  } else {
    console.log('Database connected successfully!');
    console.log('Current time:', res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};