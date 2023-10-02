const app = require("./app");
const mongoose = require("mongoose");
const dbUrl = require("./config/database");
require('dotenv').config();

const PORT = process.env.PORT || 8000;

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is Running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
