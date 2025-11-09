const db = require('../config/db');

class Purchase {
  // Create a new purchase
  static async create(purchaseData) {
    const { productId, productName, productPrice, customerName, customerEmail, customerAddress, customerPhone } = purchaseData;
    const query = `INSERT INTO purchases 
      (product_id, product_name, product_price, customer_name, customer_email, customer_address, customer_phone) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [productId, productName, productPrice, customerName, customerEmail, customerAddress, customerPhone];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  // Get all purchases
  static async findAll() {
    const query = 'SELECT * FROM purchases ORDER BY purchase_date DESC';
    const result = await db.query(query);
    return result.rows;
  }

  // Get purchase by ID
  static async findById(id) {
    const query = 'SELECT * FROM purchases WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Get purchases by customer email
  static async findByCustomerEmail(email) {
    const query = 'SELECT * FROM purchases WHERE customer_email = $1 ORDER BY purchase_date DESC';
    const result = await db.query(query, [email]);
    return result.rows;
  }
}

module.exports = Purchase;