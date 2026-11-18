const express = require('express');
const router = express.Router();
const UserGiftModel = require('../models/userGiftModel');

// Save recommended gifts in Supabase user_gifts table
router.post('/', async (req, res) => {
  try {
    const { user_id, gift_ids } = req.body;

    if (!user_id || !Array.isArray(gift_ids) || gift_ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'user_id and non-empty gift_ids array are required',
      });
    }

    const inserted = await UserGiftModel.saveRecommendations({
      user_id,
      gift_ids,
    });

    return res.status(201).json({
      success: true,
      message: `${inserted.length} gift recommendation records saved in Supabase`,
      data: { count: inserted.length, records: inserted },
    });
  } catch (error) {
    console.error('[UserGiftRoutes:POST]', error);
    return res.status(500).json({
      success: false,
      message: 'Error saving user gift recommendations',
      error: error.message,
    });
  }
});

// View all user gift records
router.get('/', async (req, res) => {
  try {
    const records = await UserGiftModel.getAll();
    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    console.error('[UserGiftRoutes:GET]', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving user gift records',
      error: error.message,
    });
  }
});

// View gifts for specific user
router.get('/user/:id', async (req, res) => {
  try {
    const records = await UserGiftModel.getByUserId(req.params.id);
    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    console.error('[UserGiftRoutes:GET /user/:id]', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving user gift records',
      error: error.message,
    });
  }
});

module.exports = router;
