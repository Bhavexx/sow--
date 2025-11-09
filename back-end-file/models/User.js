const db = require('../config/db');

class User {
  // Create a new user
  static async create(userData) {
    try {
      const { name, email, password } = userData;
      const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
      const values = [name, email, password];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new Error('Failed to create user: ' + error.message);
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await db.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding user by email:', error.message);
      throw new Error('Failed to find user: ' + error.message);
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await db.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding user by ID:', error.message);
      throw new Error('Failed to find user: ' + error.message);
    }
  }

  // Update user password
  static async updatePassword(email, password) {
    try {
      const query = 'UPDATE users SET password = $1 WHERE email = $2 RETURNING *';
      const result = await db.query(query, [password, email]);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating password:', error.message);
      throw new Error('Failed to update password: ' + error.message);
    }
  }
}

module.exports = User;