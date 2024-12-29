const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error: ", err));

const seedAdmin = async () => {
  try {
    const existingUser = await User.findOne({ email: 'admin@tenthouse.com' });
    if (existingUser) {
      console.log('Admin user already exists!');
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin@TentHouse', 10);
    
    const admin = new User({
      name: 'Admin',
      email: 'admin@tenthouse.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin:', error);
    mongoose.connection.close();
  }
};

seedAdmin();
