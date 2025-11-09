const db = require('./config/db');

// Create users table
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Create purchases table
const createPurchasesTable = `
  CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_address TEXT NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Create index on email for faster lookups
const createEmailIndex = `
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`;

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Create users table
    await db.query(createUsersTable);
    console.log('Users table created successfully!');
    
    // Create purchases table
    await db.query(createPurchasesTable);
    console.log('Purchases table created successfully!');
    
    // Create email index
    await db.query(createEmailIndex);
    console.log('Email index created successfully!');
    
    console.log('Database setup completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();