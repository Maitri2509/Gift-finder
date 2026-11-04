const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

// Import route modules
const userRoutes = require('./routes/userRoutes');
const giftRoutes = require('./routes/giftRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const userGiftRoutes = require('./routes/userGiftRoutes');

const app = express();

// Middlewares - allow all origins for smooth local development
app.use(cors());
app.use(express.json());

// Root API overview
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the GiftFinder Backend API (Node.js + Express + MySQL)',
    database: process.env.DB_NAME || 'giftfinder_db',
    endpoints: {
      health: 'GET /api/health',
      users: 'GET /api/users, POST /api/users, GET /api/users/:id/gifts',
      gifts: 'GET /api/gifts, POST /api/gifts, PUT /api/gifts/:id, POST /api/gifts/recommend',
      categories: 'GET /api/categories',
      feedback: 'GET /api/feedback, POST /api/feedback',
      userGifts: 'GET /api/user-gifts, POST /api/user-gifts',
    },
  });
});

// Health check endpoint (checks MySQL DB status and returns table statistics)
app.get('/api/health', async (req, res) => {
  try {
    const [dbResult] = await pool.query('SELECT DATABASE() AS current_db, VERSION() AS mysql_version');
    const [counts] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) AS total_users,
        (SELECT COUNT(*) FROM gifts) AS total_gifts,
        (SELECT COUNT(*) FROM categories) AS total_categories,
        (SELECT COUNT(*) FROM feedback) AS total_feedback,
        (SELECT COUNT(*) FROM user_gifts) AS total_user_gifts
    `);

    res.json({
      status: 'UP',
      database_connected: true,
      database: dbResult[0].current_db,
      mysql_version: dbResult[0].mysql_version,
      records: counts[0],
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('[Health Check Error]:', error.message);
    res.status(500).json({
      status: 'DOWN',
      database_connected: false,
      error: error.message,
    });
  }
});

// Mount modular API routes
app.use('/api/users', userRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/user-gifts', userGiftRoutes);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route ${req.method} ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[GiftFinder Server] Running on http://localhost:${PORT}`);
  console.log(`[GiftFinder Server] Database: ${process.env.DB_NAME || 'giftfinder_db'} on port ${process.env.DB_PORT || 3306}`);
});

module.exports = app;
