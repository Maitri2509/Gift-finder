const pool = require('../config/db');

// Model for 'feedback' table
const FeedbackModel = {
  // Create a new feedback entry
  async create({ user_id, gift_id = null, rating, comments }) {
    const [result] = await pool.query(
      `INSERT INTO feedback (user_id, gift_id, rating, comments)
       VALUES (?, ?, ?, ?)`,
      [user_id, gift_id || null, Number(rating), comments ? comments.trim() : null]
    );

    return this.getById(result.insertId);
  },

  // Get feedback by ID
  async getById(feedbackId) {
    const [rows] = await pool.query(
      `SELECT 
         f.feedback_id,
         f.user_id,
         u.name AS user_name,
         u.email AS user_email,
         f.gift_id,
         g.gift_name,
         f.rating,
         f.comments,
         f.created_at
       FROM feedback f
       JOIN users u ON f.user_id = u.user_id
       LEFT JOIN gifts g ON f.gift_id = g.gift_id
       WHERE f.feedback_id = ?`,
      [feedbackId]
    );
    return rows[0] || null;
  },

  // Get all feedback with user & gift information
  async getAll() {
    const [rows] = await pool.query(`
      SELECT 
        f.feedback_id,
        f.user_id,
        u.name AS user_name,
        u.email AS user_email,
        f.gift_id,
        g.gift_name,
        f.rating,
        f.comments,
        f.created_at
      FROM feedback f
      JOIN users u ON f.user_id = u.user_id
      LEFT JOIN gifts g ON f.gift_id = g.gift_id
      ORDER BY f.feedback_id DESC
    `);
    return rows;
  },

  // Get feedback for a specific gift
  async getByGiftId(giftId) {
    const [rows] = await pool.query(
      `SELECT 
         f.feedback_id,
         f.user_id,
         u.name AS user_name,
         f.rating,
         f.comments,
         f.created_at
       FROM feedback f
       JOIN users u ON f.user_id = u.user_id
       WHERE f.gift_id = ?
       ORDER BY f.feedback_id DESC`,
      [giftId]
    );
    return rows;
  },
};

module.exports = FeedbackModel;

