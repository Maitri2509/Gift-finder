const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// 1. User registration / saving user details
router.post('/', UserController.registerOrFind);

// View all users
router.get('/', UserController.getAll);

// View single user by ID
router.get('/:id', UserController.getById);

// View user gift recommendations history
router.get('/:id/gifts', UserController.getUserGifts);

module.exports = router;

