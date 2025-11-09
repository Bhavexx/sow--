const db = require('./config/db');

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    const result = await db.query('SELECT NOW()');
    console.log('Database connection successful!', result.rows[0]);
    
    // Test users table
    const tableResult = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'users'
    `);
    
    if (tableResult.rows.length > 0) {
      console.log('Users table exists');
    } else {
      console.log('Users table does not exist');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

testDatabase();