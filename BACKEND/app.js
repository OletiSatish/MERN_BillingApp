const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');
const itemRoutes = require('./src/routes/itemRoutes');
const billingRoutes = require('./src/routes/billingRoutes');
const reminderRoutes = require('./src/routes/reminderRoutes');
const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const cors = require('cors');
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON requests
const corsOptions = {
    origin: ['http://localhost:3000', 'https://your-frontend-domain.com'], // Allowed origins
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };

  app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/users', userRoutes);
app.use('/orders', orderRoutes);

module.exports = app
