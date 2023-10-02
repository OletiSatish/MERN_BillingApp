const itemController = require("../controllers/items.controller")
const express = require("express")
const route = express.Router()

route.post("/insert", itemController.create)
route.get("/allitems", itemController.getAll)

module.exports = route