const Item = require("../models/item.model");

exports.create = async (req, res) => {
  try {
    const { itemName, price } = req.body;

    // Check if an item with the same itemName already exists
    const existingItem = await Item.findOne({ itemName });
    
    if (existingItem) {
      return res.status(400).json({
        message: 'This item already exists in the database',
      });
    }

    // Create a new item if it doesn't exist
    const newItem = new Item({
      itemName,
      price,
    });

    await newItem.save();

    res.status(201).json({
      newItem,
      message: 'Data inserted successfully',
    });
  } catch (error) {
    res.status(400).json({
      error,
      message: 'Data not inserted',
    });
  }
};



exports.getAll = async (req, res) => {
  try {
    const dataItems = await Item.find({});
    res.status(200).json({
      dataItems,
      message: "Data retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};
