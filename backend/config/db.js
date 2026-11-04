const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Create a connection pool to MySQL database
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'giftfinder_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`[Database] Successfully connected to MySQL database: ${process.env.DB_NAME || 'giftfinder_db'}`);
    connection.release();
  } catch (error) {
    console.error('[Database] Connection failed:', error.message);
  }
})();

module.exports = pool;

