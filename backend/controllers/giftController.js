const GiftModel = require('../models/giftModel');
const UserModel = require('../models/userModel');
const UserGiftModel = require('../models/userGiftModel');

const GiftController = {
  // Get all gifts with optional filtering
  async getAllGifts(req, res) {
    try {
      const { occasion, relationship, gender, budget, minPrice, maxPrice, search } = req.query;
      const gifts = await GiftModel.getAll({ occasion, relationship, gender, budget, minPrice, maxPrice, search });
      return res.status(200).json({ success: true, count: gifts.length, data: gifts });
    } catch (error) {
      console.error('[GiftController:getAllGifts]', error);
      return res.status(500).json({ success: false, message: 'Error retrieving gifts', error: error.message });
    }
  },

  // Get gift by ID
  async getGiftById(req, res) {
    try {
      const { id } = req.params;
      const gift = await GiftModel.getById(id);

      if (!gift) {
        return res.status(404).json({ success: false, message: 'Gift not found' });
      }

      return res.status(200).json({ success: true, data: gift });
    } catch (error) {
      console.error('[GiftController:getGiftById]', error);
      return res.status(500).json({ success: false, message: 'Error retrieving gift', error: error.message });
    }
  },

  // Add new gift
  async createGift(req, res) {
    try {
      const { gift_name, description, price, image_url, occasion, relationship, gender, budget, category_ids } = req.body;

      if (!gift_name || !description || price == null || !image_url || !occasion || !relationship || !budget) {
        return res.status(400).json({
          success: false,
          message: 'All fields (gift_name, description, price, image_url, occasion, relationship, budget) are required',
        });
      }

      const newGift = await GiftModel.create({
        gift_name,
        description,
        price,
        image_url,
        occasion,
        relationship,
        gender,
        budget,
        category_ids,
      });

      return res.status(201).json({
        success: true,
        message: 'Gift created successfully',
        data: newGift,
      });
    } catch (error) {
      console.error('[GiftController:createGift]', error);
      return res.status(500).json({ success: false, message: 'Error creating gift', error: error.message });
    }
  },

  // Update existing gift
  async updateGift(req, res) {
    try {
      const { id } = req.params;
      const updated = await GiftModel.update(id, req.body);

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Gift not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'Gift updated successfully',
        data: updated,
      });
    } catch (error) {
      console.error('[GiftController:updateGift]', error);
      return res.status(500).json({ success: false, message: 'Error updating gift', error: error.message });
    }
  },

  // Find gifts based on user preferences and persist recommendation session
  async recommendGifts(req, res) {
    try {
      const { name, email, occasion, relationship, gender, budget, notes } = req.body;

      // 1. Validation
      if (!occasion || !relationship || !gender || !budget) {
        return res.status(400).json({
          success: false,
          message: 'Occasion, relationship, gender, and budget are required for gift recommendations',
        });
      }

      // 2. Save user if name and email provided
      let user = null;
      if (email && email.trim()) {
        user = await UserModel.createOrFind({
          name: name ? name.trim() : 'Guest User',
          email: email.trim(),
        });
        console.log(`[Form Submitted] Saved to MySQL -> Name: ${user.name}, Email: ${user.email}, user_id: ${user.user_id}`);
      }

      // 3. Query MySQL database for matching recommendations
      const recommendedGifts = await GiftModel.recommend({
        occasion,
        relationship,
        gender,
        budget,
        notes,
      });

      // 4. Save recommendations into user_gifts table if user exists
      if (user && user.user_id && recommendedGifts.length > 0) {
        const giftIds = recommendedGifts.map((g) => g.gift_id);
        await UserGiftModel.saveRecommendations({
          user_id: user.user_id,
          gift_ids: giftIds,
          occasion,
          relationship,
          gender,
          budget,
          user_notes: notes,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Gifts recommended successfully',
        user,
        count: recommendedGifts.length,
        data: recommendedGifts,
      });
    } catch (error) {
      console.error('[GiftController:recommendGifts]', error);
      return res.status(500).json({
        success: false,
        message: 'Error computing gift recommendations',
        error: error.message,
      });
    }
  },
};

module.exports = GiftController;

