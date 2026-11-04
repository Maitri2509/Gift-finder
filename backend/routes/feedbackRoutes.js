const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/feedbackController');

// 6. Submitting feedback
router.post('/', FeedbackController.submitFeedback);

// Viewing all feedback
router.get('/', FeedbackController.getAllFeedback);

// Viewing feedback for a specific gift
router.get('/gift/:giftId', FeedbackController.getByGift);

module.exports = router;

