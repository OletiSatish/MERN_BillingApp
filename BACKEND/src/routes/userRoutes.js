const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');  // Make sure these functions are correctly imported
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Get all users (only accessible by admin)
router.get('/', authMiddleware, roleMiddleware('admin'), getUsers);

// Get a user by ID (user can view their own details, admin can view any user's details)
router.get('/:id', authMiddleware, getUserById);

// Update user details (user can update their own details, admin can update any user's details)
router.put('/:id', authMiddleware, updateUser);

// Delete a user (only admin can delete users)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteUser);

module.exports = router;

