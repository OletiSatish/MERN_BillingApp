const User = require('../models/User');

// Get all users (only accessible by admin)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.status(200).json(users);  // Send the users as a response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });  // Handle errors
  }
};

// Get a user by ID (user can view their own details, admin can view any user's details)
const getUserById = async (req, res) => {
  const userId = req.params.id;
  
  try {
    const user = await User.findById(userId);  // Find user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is authorized to view details
    if (userId !== req.userId && req.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this user' });
    }

    res.status(200).json(user);  // Return user details
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user details (user can update their own details, admin can update any user's details)
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is authorized to update details
    if (userId !== req.userId && req.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (role) user.role = role;

    await user.save();  // Save updated user
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a user (only admin can delete users)
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only admin can delete users
    if (req.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this user' });
    }

    await user.remove();  // Delete user from the database
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
