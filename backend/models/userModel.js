const pool = require('../config/db');

// Model for 'users' table
const UserModel = {
  // Create or retrieve existing user by email
  async createOrFind({ name, email }) {
    // Check if user already exists
    const [existing] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email.trim().toLowerCase()]
    );

    if (existing.length > 0) {
      // If name was updated, update user name
      if (name && name.trim() !== existing[0].name) {
        await pool.query(
          'UPDATE users SET name = ? WHERE user_id = ?',
          [name.trim(), existing[0].user_id]
        );
        existing[0].name = name.trim();
      }
      return existing[0];
    }

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name.trim(), email.trim().toLowerCase()]
    );

    return {
      user_id: result.insertId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      created_at: new Date(),
    };
  },

  // Get user by ID
  async getById(userId) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE user_id = ?',
      [userId]
    );
    return rows[0] || null;
  },

  // Get user by Email
  async getByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email.trim().toLowerCase()]
    );
    return rows[0] || null;
  },

  // List all users
  async getAll() {
    const [rows] = await pool.query(
      'SELECT user_id, name, email, created_at FROM users ORDER BY user_id DESC'
    );
    return rows;
  },
};

module.exports = UserModel;

