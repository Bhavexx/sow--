const db = require('./config/db');

async function listTables() {
  try {
    console.log('Retrieving database tables...');
    
    // Query to get all tables in the public schema
    const result = await db.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    
    console.log('Tables in database:');
    result.rows.forEach(row => {
      console.log('-', row.table_name);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error retrieving tables:', error);
    process.exit(1);
  }
}

listTables();