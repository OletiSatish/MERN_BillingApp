const express = require('express');
const router = express.Router();
const {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
} = require('../controllers/reminderController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Create a new reminder (any authenticated user can create their own reminder)
router.post('/', authMiddleware, createReminder);

// Get all reminders (admins can view all reminders)
router.get('/', authMiddleware, roleMiddleware('admin'), getReminders);

// Get customer's own reminders (accessible by customer only)
router.get('/my-reminders', authMiddleware, roleMiddleware('customer'), getReminders);

// Update a reminder (any authenticated user can update their own reminder)
router.put('/:id', authMiddleware, updateReminder);

// Delete a reminder (any authenticated user can delete their own reminder)
router.delete('/:id', authMiddleware, deleteReminder);

module.exports = router;
