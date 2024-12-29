const express = require("express");
const router = express.Router();
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create a new item (only accessible by admin)
router.post("/create", authMiddleware, roleMiddleware("admin"), createItem);

// Update an item (only accessible by admin)
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateItem);

// Delete an item (only accessible by admin)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteItem);

// Get all items (accessible by both admin and customer)
router.get("/", getItems);

// Get a single item by ID (accessible by both admin and customer)
router.get("/:id", getItemById);

module.exports = router;
