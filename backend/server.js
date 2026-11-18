const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabase');

// Import route modules
const userRoutes = require('./routes/userRoutes');
const giftRoutes = require('./routes/giftRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const userGiftRoutes = require('./routes/userGiftRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static frontend build if it exists
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// API overview
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the GiftFinder Backend API (Node.js + Express + Supabase)',
    database_provider: 'Supabase (PostgreSQL)',
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

// Health check endpoint (checks Supabase connectivity and table counts)
app.get('/api/health', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(200).json({
        status: 'PENDING_CONFIG',
        database_connected: false,
        message: 'SUPABASE_URL and SUPABASE_KEY need to be configured in backend/.env',
        timestamp: new Date(),
      });
    }

    // Query exact row counts from all 5 Supabase tables in parallel
    const [
      { count: usersCount, error: usersErr },
      { count: giftsCount, error: giftsErr },
      { count: categoriesCount, error: catErr },
      { count: feedbackCount, error: feedErr },
      { count: userGiftsCount, error: ugErr },
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('gifts').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('feedback').select('*', { count: 'exact', head: true }),
      supabase.from('user_gifts').select('*', { count: 'exact', head: true }),
    ]);

    const anyError = usersErr || giftsErr || catErr || feedErr || ugErr;
    if (anyError) {
      return res.status(200).json({
        status: 'DEGRADED',
        database_connected: true,
        provider: 'Supabase (PostgreSQL)',
        warning: anyError.message,
        records: {
          total_users: usersCount ?? 'error',
          total_gifts: giftsCount ?? 'error',
          total_categories: categoriesCount ?? 'error',
          total_feedback: feedbackCount ?? 'error',
          total_user_gifts: userGiftsCount ?? 'error',
        },
        timestamp: new Date(),
      });
    }

    res.json({
      status: 'UP',
      database_connected: true,
      provider: 'Supabase (PostgreSQL)',
      records: {
        total_users: usersCount || 0,
        total_gifts: giftsCount || 0,
        total_categories: categoriesCount || 0,
        total_feedback: feedbackCount || 0,
        total_user_gifts: userGiftsCount || 0,
      },
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

// Catch-all route to serve React app in production, or 404 for API calls
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: `API route ${req.method} ${req.originalUrl} not found`,
    });
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) next();
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
  console.log(`[GiftFinder Server] Database Provider: Supabase`);
});

module.exports = app;
