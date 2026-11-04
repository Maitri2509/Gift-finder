const FeedbackModel = require('../models/feedbackModel');
const UserModel = require('../models/userModel');

const FeedbackController = {
  // Submit new feedback
  async submitFeedback(req, res) {
    try {
      const { user_id, email, name, gift_id, rating, comments } = req.body;

      if (!rating || Number(rating) < 1 || Number(rating) > 5) {
        return res.status(400).json({
          success: false,
          message: 'A valid rating between 1 and 5 is required',
        });
      }

      let targetUserId = user_id;

      // If user_id not provided but email is given, find or create the user
      if (!targetUserId && email) {
        const user = await UserModel.createOrFind({
          name: name || 'Valued User',
          email,
        });
        targetUserId = user.user_id;
      }

      if (!targetUserId) {
        return res.status(400).json({
          success: false,
          message: 'User identification (user_id or email) is required to submit feedback',
        });
      }

      const feedback = await FeedbackModel.create({
        user_id: targetUserId,
        gift_id: gift_id || null,
        rating: Number(rating),
        comments,
      });

      return res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully. Thank you!',
        data: feedback,
      });
    } catch (error) {
      console.error('[FeedbackController:submitFeedback]', error);
      return res.status(500).json({
        success: false,
        message: 'Error submitting feedback',
        error: error.message,
      });
    }
  },

  // Get all feedback
  async getAllFeedback(req, res) {
    try {
      const feedback = await FeedbackModel.getAll();
      return res.status(200).json({ success: true, count: feedback.length, data: feedback });
    } catch (error) {
      console.error('[FeedbackController:getAllFeedback]', error);
      return res.status(500).json({
        success: false,
        message: 'Error retrieving feedback',
        error: error.message,
      });
    }
  },

  // Get feedback for a specific gift
  async getByGift(req, res) {
    try {
      const { giftId } = req.params;
      const feedback = await FeedbackModel.getByGiftId(giftId);
      return res.status(200).json({ success: true, count: feedback.length, data: feedback });
    } catch (error) {
      console.error('[FeedbackController:getByGift]', error);
      return res.status(500).json({
        success: false,
        message: 'Error retrieving gift feedback',
        error: error.message,
      });
    }
  },
};

module.exports = FeedbackController;

