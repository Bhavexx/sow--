const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from root directory
dotenv.config({ path: '../.env' });

// Create a PostgreSQL connection pool with better error handling
let pool;

// Only create pool if we have ALL required database credentials
if (process.env.DB_USER && process.env.DB_HOST && process.env.DB_NAME && 
    process.env.DB_USER.trim() !== '' && process.env.DB_HOST.trim() !== '' && process.env.DB_NAME.trim() !== '') {
  console.log('Database credentials found. Attempting to connect...');
  
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    ssl: {
      rejectUnauthorized: false
    }
  });

  // Test the database connection
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Database connection error:', err.message);
    } else {
      console.log('Database connected successfully!');
    }
  });
} else {
  console.log('No database credentials provided or incomplete credentials. Database functionality will be disabled.');
  pool = {
    query: (text, params) => {
      return Promise.reject(new Error('Database not configured or credentials missing'));
    }
  };
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};