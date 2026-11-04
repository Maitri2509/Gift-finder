const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

// 3. View all gift categories
router.get('/', CategoryController.getAll);

// View single category by ID
router.get('/:id', CategoryController.getById);

module.exports = router;

