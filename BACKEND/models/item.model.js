const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    unique: true,
    set: (value) => value.toLowerCase(),
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model("DataItems", ItemSchema)
