const db = require('./config/db');

async function testPurchaseInsert() {
  try {
    console.log('Testing purchase insertion...');
    
    // Insert a test purchase record
    const query = `INSERT INTO purchases 
      (product_id, product_name, product_price, customer_name, customer_email, customer_address, customer_phone) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [1, 'Test Product', 99.99, 'John Doe', 'john@test.com', '123 Test St', '555-1234'];
    
    const result = await db.query(query, values);
    console.log('Insert successful:', result.rows[0]);
    
    // Retrieve the inserted record
    const selectResult = await db.query('SELECT * FROM purchases WHERE id = $1', [result.rows[0].id]);
    console.log('Retrieved record:', selectResult.rows[0]);
    
    console.log('Database test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database test error:', error);
    process.exit(1);
  }
}

testPurchaseInsert();