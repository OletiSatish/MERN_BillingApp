const dotenv = require('dotenv');

dotenv.config();

module.exports = process.env.MONGODB_URI;
