const pool = require('../config/db');

// Model for 'user_gifts' table
const UserGiftModel = {
  // Save one or multiple recommended gifts for a user session
  async saveRecommendations({ user_id, gift_ids, occasion, relationship, gender, budget, user_notes }) {
    if (!Array.isArray(gift_ids) || gift_ids.length === 0) {
      return [];
    }

    const inserted = [];
    for (const gift_id of gift_ids) {
      const [result] = await pool.query(
        `INSERT INTO user_gifts (user_id, gift_id, occasion, relationship, gender, budget, user_notes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user_id, gift_id, occasion || null, relationship || null, gender || null, budget || null, user_notes || null]
      );
      inserted.push(result.insertId);
    }

    return inserted;
  },

  // Get gift history for a specific user
  async getByUserId(userId) {
    const [rows] = await pool.query(
      `SELECT 
         ug.user_gift_id,
         ug.user_id,
         ug.occasion,
         ug.relationship,
         ug.gender,
         ug.budget,
         ug.user_notes,
         ug.created_at,
         g.gift_id,
         g.gift_name,
         g.price,
         g.image_url,
         g.description
       FROM user_gifts ug
       JOIN gifts g ON ug.gift_id = g.gift_id
       WHERE ug.user_id = ?
       ORDER BY ug.user_gift_id DESC`,
      [userId]
    );
    return rows;
  },

  // Get all user gift records
  async getAll() {
    const [rows] = await pool.query(
      `SELECT 
         ug.user_gift_id,
         ug.user_id,
         u.name AS user_name,
         u.email AS user_email,
         ug.gift_id,
         g.gift_name,
         g.price,
         ug.occasion,
         ug.relationship,
         ug.gender,
         ug.budget,
         ug.user_notes,
         ug.created_at
       FROM user_gifts ug
       JOIN users u ON ug.user_id = u.user_id
       JOIN gifts g ON ug.gift_id = g.gift_id
       ORDER BY ug.user_gift_id DESC`
    );
    return rows;
  },
};

module.exports = UserGiftModel;

