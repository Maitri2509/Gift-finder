const express = require('express');
const router = express.Router();
const GiftController = require('../controllers/giftController');

// 2. View all gifts with optional filtering
router.get('/', GiftController.getAllGifts);

// 4. Find gifts based on user preferences (recommendation endpoint)
router.post('/recommend', GiftController.recommendGifts);

// View single gift by ID
router.get('/:id', GiftController.getGiftById);

// Add new gift
router.post('/', GiftController.createGift);

// Update existing gift
router.put('/:id', GiftController.updateGift);

module.exports = router;

