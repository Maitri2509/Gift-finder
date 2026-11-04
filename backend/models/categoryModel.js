const pool = require('../config/db');

// Model for 'categories' table
const CategoryModel = {
  // Get all categories with count of associated gifts
  async getAll() {
    const [rows] = await pool.query(`
      SELECT 
        c.category_id,
        c.category_name,
        c.description,
        COUNT(gc.gift_id) AS total_gifts
      FROM categories c
      LEFT JOIN gift_categories gc ON c.category_id = gc.category_id
      GROUP BY c.category_id, c.category_name, c.description
      ORDER BY c.category_id ASC
    `);
    return rows;
  },

  // Get single category by ID
  async getById(categoryId) {
    const [rows] = await pool.query(
      'SELECT * FROM categories WHERE category_id = ?',
      [categoryId]
    );
    return rows[0] || null;
  },
};

module.exports = CategoryModel;

