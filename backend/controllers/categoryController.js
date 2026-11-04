const CategoryModel = require('../models/categoryModel');

const CategoryController = {
  // Get all categories
  async getAll(req, res) {
    try {
      const categories = await CategoryModel.getAll();
      return res.status(200).json({ success: true, count: categories.length, data: categories });
    } catch (error) {
      console.error('[CategoryController:getAll]', error);
      return res.status(500).json({ success: false, message: 'Error retrieving categories', error: error.message });
    }
  },

  // Get category by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.getById(id);

      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      return res.status(200).json({ success: true, data: category });
    } catch (error) {
      console.error('[CategoryController:getById]', error);
      return res.status(500).json({ success: false, message: 'Error retrieving category', error: error.message });
    }
  },
};

module.exports = CategoryController;

