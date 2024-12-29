# Tent House Management Application
## Overview
The Tent House Management Application is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It is designed to streamline the management of items and billing for a tent house business, enabling easy tracking of rentals, costs, and transactions.

## Features:
Item Management: Admins can add and manage items for rent (e.g., tents, chairs, tables, etc.) in the application.
Billing Calculation: The system automatically calculates the total cost based on the items selected and their respective quantities.
User Registration and Authentication: Users can register and log in to access the platform securely.
Simple Interface: The application provides an intuitive and user-friendly interface for both admins and customers.
Use Case:
Tent House Business: For tent house owners, this application helps in managing the items available for rent, tracking costs, and generating total billing amounts based on customer orders.


## Tent House Application v2 - Frontend Folder Structure

src/
├── assets/                 # Static files (images, fonts, etc.)
│   ├── logo.png            # Example logo
│   └── ...
├── components/             # Reusable components
│   ├── Header.js           # Header component
│   ├── Footer.js           # Footer component
│   ├── ItemCard.js         # Card for displaying items
│   └── ...
├── pages/                  # Page components (views)
│   ├── Home.js             # Home page
│   ├── Login.js            # Login page
│   ├── Register.js         # Register page
│   ├── Dashboard.js        # Admin Dashboard
│   ├── Billing.js          # Billing page (for customers)
│   ├── Profile.js          # User profile page
│   └── ...
├── redux/                  # Redux-related files
│   ├── reducers/           # Redux slices (reducers)
│   │   ├── authSlice.js    # Handles authentication state
│   │   ├── itemSlice.js    # Handles items state
│   │   ├── billingSlice.js # Handles billing state
│   │   └── index.js        # Combines all reducers
│   ├── store.js            # Configures the Redux store
│   ├── types.js            # Action types (optional)
│   └── ...
├── routes/                 # Route definitions
│   ├── AdminRoutes.js      # Admin-specific routes
│   ├── UserRoutes.js       # User-specific routes
│   ├── ProtectedRoute.js   # Protected routes (for private access)
│   ├── index.js            # Consolidates all routes
│   └── ...
├── services/               # API calls and utility functions
│   ├── authService.js      # Handles authentication API calls (login, register, etc.)
│   ├── itemService.js      # Handles item-related API calls (fetch, add, etc.)
│   ├── billingService.js   # Handles billing-related API calls (calculate, send email, etc.)
│   └── ...
├── utils/                  # Utility functions (e.g., validation, formatting)
│   ├── validate.js         # Utility function for form validation
│   ├── format.js           # Utility function for formatting data
│   └── ...
├── App.js                  # Main app component
├── index.js                # Entry point (renders the app)
├── styles/                 # Global styles (CSS or SCSS)
│   ├── main.css            # Main CSS file
│   └── ...
└── .env                    # Environment variables (e.g., API URLs, JWT secret)





## Backend Folder 


/backend
│
├── /config                   # Configuration files (e.g., database, environment variables)
│   └── config.js             # Configuration file for environment variables, DB connection, etc.
│
├── /controllers              # Controller files for handling requests
│   ├── authController.js     # Handle user authentication
│   ├── itemController.js     # Handle item management (CRUD)
│   ├── billingController.js  # Handle billing functionality
│   ├── reminderController.js # Handle reminders and alerts
│   └── userController.js     # Handle user management
│
├── /models                   # Mongoose models for database schemas
│   ├── User.js               # User model
│   ├── Item.js               # Item model
│   ├── Billing.js            # Billing model
│   └── Reminder.js           # Reminder model
│
├── /routes                   # Express routes for different modules
│   ├── authRoutes.js         # Routes for authentication (login, signup)
│   ├── itemRoutes.js         # Routes for item management (CRUD)
│   ├── billingRoutes.js      # Routes for billing functionality
│   ├── reminderRoutes.js     # Routes for reminders and alerts
│   └── userRoutes.js         # Routes for user management
│
├── /middleware               # Middleware for handling authentication and authorization
│   ├── authMiddleware.js     # Middleware to protect routes and verify tokens
│   └── roleMiddleware.js     # Middleware to check user roles (admin/customer)
│
├── /scripts                  # Scripts for automation (e.g., seeding admin user)
│   └── seedAdmin.js          # Seed script to create a default admin user
│
├── /utils                    # Utility functions (e.g., for token handling, validation)
│   ├── emailUtils.js         # Email utility for sending emails (using Nodemailer/SendGrid)
│   └── jwtUtils.js           # JWT token utilities (e.g., sign, verify)
│
├── app.js                    # Main Express app setup
├── server.js                 # Server setup and start point
└── package.json              # NPM dependencies and scripts
