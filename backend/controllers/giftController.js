const GiftModel = require('../models/giftModel');
const UserModel = require('../models/userModel');
const UserGiftModel = require('../models/userGiftModel');

const GiftController = {
  // Get all gifts with optional filtering
  async getAllGifts(req, res) {
    try {
      const { minPrice, maxPrice, search } = req.query;
      const gifts = await GiftModel.getAll({ minPrice, maxPrice, search });
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
      const { name, gift_name, price, image, image_url, category_ids } = req.body;
      const finalName = name || gift_name;
      const finalImage = image || image_url;

      if (!finalName || price == null || !finalImage) {
        return res.status(400).json({
          success: false,
          message: 'name, price, and image are required',
        });
      }

      const newGift = await GiftModel.create({
        name: finalName,
        price,
        image: finalImage,
        category_ids,
      });

      return res.status(201).json({
        success: true,
        message: 'Gift created successfully in Supabase',
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

  // Find gifts based on user preferences and persist recommendation session in Supabase
  async recommendGifts(req, res) {
    try {
      const { name, occasion, relationship, gender, budget, notes } = req.body;

      // 1. Validation
      if (!occasion || !relationship || !gender || !budget) {
        return res.status(400).json({
          success: false,
          message: 'Occasion, relationship, gender, and budget are required for gift recommendations',
        });
      }

      // 2. Save user session into Supabase 'users' table
      let user = null;
      try {
        user = await UserModel.create({
          name: name ? name.trim() : 'Guest User',
          occasion,
          relationship,
          budget,
        });
        console.log(`[Form Submitted] User record created in Supabase: ID ${user.id}, Name: ${user.name}`);
      } catch (userErr) {
        console.warn('[GiftController] Could not persist user to Supabase:', userErr.message);
      }

      // 3. Query Supabase database for matching recommendations
      const recommendedGifts = await GiftModel.recommend({
        occasion,
        relationship,
        gender,
        budget,
        notes,
      });

      // 4. Save recommendations into Supabase 'user_gifts' table if user was created
      if (user && user.id && recommendedGifts.length > 0) {
        const giftIds = recommendedGifts.map((g) => g.id || g.gift_id);
        await UserGiftModel.saveRecommendations({
          user_id: user.id,
          gift_ids: giftIds,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Gifts recommended successfully from Supabase',
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
