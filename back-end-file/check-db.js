const db = require('./config/db');

async function checkDatabase() {
  try {
    console.log('Checking database connection...');
    
    // Test connection
    const connResult = await db.query('SELECT NOW()');
    console.log('✅ Database connected successfully!');
    console.log('Current time:', connResult.rows[0].now);
    
    // Check if users table exists
    const tableResult = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'users'
    `);
    
    if (tableResult.rows.length > 0) {
      console.log('✅ Users table exists');
      
      // Count users
      const countResult = await db.query('SELECT COUNT(*) FROM users');
      console.log(`👥 Total users: ${countResult.rows[0].count}`);
      
      // Show table structure
      console.log('\n📋 Table structure:');
      const structureResult = await db.query(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'users'
        ORDER BY ordinal_position
      `);
      
      console.table(structureResult.rows);
      
      // Show sample data (if any)
      if (countResult.rows[0].count > 0) {
        console.log('\n📝 Sample users:');
        const dataResult = await db.query('SELECT id, name, email, created_at FROM users LIMIT 5');
        console.table(dataResult.rows);
      }
    } else {
      console.log('❌ Users table does not exist');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    process.exit(1);
  }
}

checkDatabase();