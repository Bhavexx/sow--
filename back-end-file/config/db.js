const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'fakturera_db',
  password: process.env.DB_PASSWORD || '1234567890',
  port: process.env.DB_PORT || 5432,
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected successfully!');
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};