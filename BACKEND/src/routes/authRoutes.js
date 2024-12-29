const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// User registration (anyone can register)
router.post('/register', register);

// User login (anyone can login)
router.post('/login', login);

module.exports = router;
