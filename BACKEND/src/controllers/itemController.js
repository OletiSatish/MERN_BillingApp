const Item = require('../models/Item'); // Import the Item model

// Create a new item
const createItem = async (req, res) => {
  const { name, description, price, quantity, available } = req.body;

  try {
    // Create a new item
    const newItem = new Item({ name, description, price, quantity, available });
    await newItem.save();
    res.status(201).json({ message: 'Item created successfully', item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single item by ID
const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an item by ID
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, available } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, description, price, quantity, available },
      { new: true } // Return the updated item
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an item by ID
const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
