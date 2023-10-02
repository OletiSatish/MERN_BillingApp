const express = require("express");
const app = express();
const corsMiddleware = require("./middleware/corsMiddleware");
const itemsRoutes = require("./routes/item.route");

app.use(corsMiddleware);
app.use(express.json());
app.use("/", itemsRoutes);

module.exports = app;
