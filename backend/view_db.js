const pool = require('./config/db');

async function viewDatabase() {
  console.log('\n======================================================');
  console.log('       GIFTFINDER DATABASE VIEWER (MySQL)            ');
  console.log('======================================================\n');

  try {
    // 1. Users Table
    console.log('--- 1. USERS TABLE (users) ---');
    const [users] = await pool.query('SELECT user_id, name, email, created_at FROM users ORDER BY user_id DESC LIMIT 10');
    console.table(users);

    // 2. User Gift Recommendations History Table
    console.log('\n--- 2. USER RECOMMENDATIONS HISTORY (user_gifts) ---');
    const [userGifts] = await pool.query(`
      SELECT 
        ug.user_gift_id,
        u.name AS user_name,
        g.gift_name,
        ug.occasion,
        ug.relationship,
        ug.budget,
        ug.created_at
      FROM user_gifts ug
      JOIN users u ON ug.user_id = u.user_id
      JOIN gifts g ON ug.gift_id = g.gift_id
      ORDER BY ug.user_gift_id DESC
      LIMIT 10
    `);
    console.table(userGifts);

    // 3. Feedback Table
    console.log('\n--- 3. USER FEEDBACK TABLE (feedback) ---');
    const [feedback] = await pool.query(`
      SELECT 
        f.feedback_id,
        u.name AS user_name,
        f.rating,
        f.comments,
        f.created_at
      FROM feedback f
      JOIN users u ON f.user_id = u.user_id
      ORDER BY f.feedback_id DESC
      LIMIT 10
    `);
    console.table(feedback);

    // 4. Gifts Catalog (Top 5)
    console.log('\n--- 4. GIFTS CATALOG (gifts - First 5 items) ---');
    const [gifts] = await pool.query('SELECT gift_id, gift_name, price, budget, occasion FROM gifts LIMIT 5');
    console.table(gifts);

    // 5. Categories Table
    console.log('\n--- 5. CATEGORIES TABLE (categories) ---');
    const [categories] = await pool.query('SELECT category_id, category_name FROM categories');
    console.table(categories);

    // Summary counts
    const [counts] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) AS total_users,
        (SELECT COUNT(*) FROM gifts) AS total_gifts,
        (SELECT COUNT(*) FROM categories) AS total_categories,
        (SELECT COUNT(*) FROM feedback) AS total_feedback,
        (SELECT COUNT(*) FROM user_gifts) AS total_user_gifts
    `);
    console.log('\n--- TOTAL RECORD COUNTS ---');
    console.table(counts);

    console.log('\nAll data retrieved successfully from MySQL database: giftfinder_db\n');
  } catch (error) {
    console.error('Error viewing database:', error.message);
  } finally {
    process.exit(0);
  }
}

viewDatabase();

