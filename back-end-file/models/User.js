const db = require('../config/db');

class User {
  // Create a new user
  static async create(userData) {
    const { name, email, password } = userData;
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, password];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Update user password
  static async updatePassword(email, password) {
    const query = 'UPDATE users SET password = $1 WHERE email = $2 RETURNING *';
    const result = await db.query(query, [password, email]);
    return result.rows[0];
  }
}

module.exports = User;