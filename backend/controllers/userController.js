const UserModel = require('../models/userModel');
const UserGiftModel = require('../models/userGiftModel');

const UserController = {
  // Register or create user session
  async registerOrFind(req, res) {
    try {
      const { name, occasion, relationship, budget } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: 'Name is required' });
      }

      const user = await UserModel.create({ name, occasion, relationship, budget });
      return res.status(200).json({
        success: true,
        message: 'User session created successfully in Supabase',
        data: user,
      });
    } catch (error) {
      console.error('[UserController:registerOrFind]', error);
      return res.status(500).json({ success: false, message: 'Database error saving user', error: error.message });
    }
  },

  // Get all users
  async getAll(req, res) {
    try {
      const users = await UserModel.getAll();
      return res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
      console.error('[UserController:getAll]', error);
      return res.status(500).json({ success: false, message: 'Error retrieving users', error: error.message });
    }
  },

  // Get single user by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.getById(id);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error('[UserController:getById]', error);
      return res.status(500).json({ success: false, message: 'Error retrieving user', error: error.message });
    }
  },

  // Get gift history for user
  async getUserGifts(req, res) {
    try {
      const { id } = req.params;
      const history = await UserGiftModel.getByUserId(id);
      return res.status(200).json({ success: true, count: history.length, data: history });
    } catch (error) {
      console.error('[UserController:getUserGifts]', error);
      return res.status(500).json({ success: false, message: 'Error retrieving user gifts', error: error.message });
    }
  },
};

module.exports = UserController;
