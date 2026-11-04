const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function seedDatabase() {
  console.log('[Seed] Starting GiftFinder database initialization...');

  // Connect to MySQL server (without selecting DB first, to ensure DB creation works)
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    console.log('[Seed] Executing schema.sql into MySQL...');

    await connection.query(schemaSql);
    console.log('[Seed] Database `giftfinder_db` and tables created and seeded successfully!');

    // Show table counts
    await connection.query('USE giftfinder_db;');
    const [counts] = await connection.query(`
      SELECT 'users' AS tableName, COUNT(*) AS count FROM users
      UNION ALL SELECT 'gifts', COUNT(*) FROM gifts
      UNION ALL SELECT 'categories', COUNT(*) FROM categories
      UNION ALL SELECT 'feedback', COUNT(*) FROM feedback
      UNION ALL SELECT 'user_gifts', COUNT(*) FROM user_gifts
      UNION ALL SELECT 'gift_categories', COUNT(*) FROM gift_categories;
    `);

    console.table(counts);
  } catch (err) {
    console.error('[Seed Error]:', err.message);
  } finally {
    await connection.end();
  }
}

seedDatabase();

