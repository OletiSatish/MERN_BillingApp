const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Validate inputs
        if (!name || !email || !password || !role) {
            console.log('Validation failed: Missing fields');
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            console.log('Validation failed: Invalid email format');
            return res.status(400).json({ message: 'Invalid email format' });
        }
        if (password.length < 6) {
            console.log('Validation failed: Password too short');
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.log(`User with email ${email} already exists`);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        // Create new user
        const newUser = new User({ name, email: email.toLowerCase(), password: hashedPassword, role });
        await newUser.save();
        console.log(`New user created: ${newUser.email}`);

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log(`JWT token generated for user: ${newUser.email}`);

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Login a user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            console.log(`User not found: ${email}`);
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`Password comparison result for ${email}: ${isMatch}`);

        if (!isMatch) {
            console.log(`Invalid credentials for: ${email}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log(`JWT token generated for user: ${email}`);

        res.status(200).json({ message: 'Login successful', token, role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




module.exports = { register, login };
