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
  
  // Try to connect with SSL first, fallback to non-SSL if needed
  try {
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
        console.error('Database connection with SSL failed:', err.message);
        // Try without SSL
        console.log('Attempting connection without SSL...');
        const poolWithoutSSL = new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          password: process.env.DB_PASSWORD,
          port: process.env.DB_PORT || 5432,
          connectionTimeoutMillis: 5000,
          idleTimeoutMillis: 30000
        });
        
        poolWithoutSSL.query('SELECT NOW()', (err2, res2) => {
          if (err2) {
            console.error('Database connection without SSL also failed:', err2.message);
          } else {
            console.log('Database connected successfully without SSL!');
            pool = poolWithoutSSL;
          }
        });
      } else {
        console.log('Database connected successfully with SSL!');
      }
    });
  } catch (error) {
    console.error('Error creating database pool:', error.message);
  }
} else {
  console.log('No database credentials provided or incomplete credentials. Database functionality will be disabled.');
  pool = {
    query: (text, params) => {
      return Promise.reject(new Error('Database not configured or credentials missing'));
    }
  };
}

module.exports = {
  query: (text, params) => {
    if (pool) {
      return pool.query(text, params);
    } else {
      return Promise.reject(new Error('Database not configured or credentials missing'));
    }
  },
};