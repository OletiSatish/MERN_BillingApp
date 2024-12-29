const Reminder = require('../models/Reminder');
const { sendEmail } = require('../utils/emailUtils');

// Create a new reminder
const createReminder = async (req, res) => {
  const { title, description, date, userId } = req.body;

  try {
    const newReminder = new Reminder({ title, description, date, userId });
    await newReminder.save();

    // Get user email
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Send email notification
    const subject = 'Reminder Notification';
    const text = `Hi ${user.email},\n\nYou have a new reminder: ${title}\nDescription: ${description}\nDate: ${date}\n\nBest regards,\nTeam`;
    const html = `<p>Hi ${user.email},</p><p>You have a new reminder: <strong>${title}</strong></p><p>Description: ${description}</p><p>Date: ${date}</p><p>Best regards,<br>Team</p>`;
    await sendEmail(user.email, subject, text, html);

    res.status(201).json({ message: 'Reminder created successfully', reminder: newReminder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all reminders
const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single reminder by ID
const getReminder = async (req, res) => {
  const { id } = req.params;

  try {
    const reminder = await Reminder.findById(id);
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    res.status(200).json(reminder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a reminder
const updateReminder = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, userId } = req.body;

  try {
    const updatedReminder = await Reminder.findByIdAndUpdate(
      id,
      { title, description, date, userId },
      { new: true }
    );
    if (!updatedReminder) return res.status(404).json({ message: 'Reminder not found' });
    res.status(200).json({ message: 'Reminder updated successfully', reminder: updatedReminder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a reminder
const deleteReminder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReminder = await Reminder.findByIdAndDelete(id);
    if (!deletedReminder) return res.status(404).json({ message: 'Reminder not found' });
    res.status(200).json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createReminder, getReminders, getReminder, updateReminder, deleteReminder };
