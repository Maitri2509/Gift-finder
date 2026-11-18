const FeedbackModel = require('../models/feedbackModel');
const UserModel = require('../models/userModel');

const FeedbackController = {
  // Submit new feedback
  async submitFeedback(req, res) {
    try {
      const { user_id, name, rating, comments } = req.body;

      if (!rating || Number(rating) < 1 || Number(rating) > 5) {
        return res.status(400).json({
          success: false,
          message: 'A valid rating between 1 and 5 is required',
        });
      }

      let targetUserId = user_id;

      // If user_id not provided, create a user record in Supabase to fulfill the foreign key constraint
      if (!targetUserId) {
        try {
          const user = await UserModel.create({
            name: name ? name.trim() : 'Valued Customer',
          });
          targetUserId = user.id;
        } catch (uErr) {
          console.warn('[FeedbackController] Could not create user for feedback:', uErr.message);
        }
      }

      if (!targetUserId) {
        return res.status(400).json({
          success: false,
          message: 'A valid user_id or user record is required to submit feedback',
        });
      }

      const feedback = await FeedbackModel.create({
        user_id: targetUserId,
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

  // Get feedback by gift (or recent reviews)
  async getByGift(req, res) {
    try {
      const feedback = await FeedbackModel.getAll();
      return res.status(200).json({ success: true, count: feedback.length, data: feedback });
    } catch (error) {
      console.error('[FeedbackController:getByGift]', error);
      return res.status(500).json({
        success: false,
        message: 'Error retrieving feedback',
        error: error.message,
      });
    }
  },
};

module.exports = FeedbackController;
