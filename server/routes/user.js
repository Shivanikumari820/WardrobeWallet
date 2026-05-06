const express = require('express');
const User = require('../models/user'); // Make sure this path is correct
const router = express.Router();

// Debug middleware for user routes
router.use((req, res, next) => {
  console.log(`User route accessed: ${req.method} ${req.path}`);
  next();
});

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    console.log('Found users:', users.length);
    res.json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
});

// POST signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone,
      address
    });

    await user.save();
    console.log('User created:', user.email);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      },
      token: 'dummy-token'
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Plain text password check (for dev only; use bcrypt in production)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Respond with user data (excluding password)
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      },
      token: 'dummy-token'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE route for deleting a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', deletedUser: user });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update user profile - Make sure this comes AFTER other specific routes but BEFORE the catch-all
router.put('/:id', async (req, res) => {
  try {
    console.log('PUT request received for user ID:', req.params.id);
    console.log('Request body:', req.body);
    
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    // Validate ObjectId format first
    if (!id || id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(id)) {
      console.log('Invalid ObjectId format:', id);
      return res.status(400).json({ 
        success: false,
        message: 'Invalid user ID format. ID must be a 24-character hex string.' 
      });
    }

    // Validate required fields
    if (!name || !email || !phone) {
      console.log('Validation failed: missing required fields');
      return res.status(400).json({ 
        success: false,
        message: 'Name, email, and phone are required fields' 
      });
    }

    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      console.log('User not found with ID:', id);
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    console.log('Existing user found:', existingUser.email);

    // Check if email is already taken by another user
    const emailCheck = await User.findOne({ 
      email: email.trim().toLowerCase(), 
      _id: { $ne: id } 
    });
    
    if (emailCheck) {
      console.log('Email already exists for another user:', email);
      return res.status(400).json({ 
        success: false,
        message: 'Email already exists' 
      });
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        address: address ? address.trim() : existingUser.address
      },
      { 
        new: true, // Return updated document
        runValidators: true // Run mongoose validators
      }
    );

    console.log('User updated successfully:', updatedUser.email);

    // Remove password from response
    const userResponse = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Error updating user profile:', error);
    
    // Handle CastError (invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid user ID format' 
      });
    }
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already exists' 
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        message: 'Validation error', 
        details: error.message 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error.message 
    });
  }
});

module.exports = router;
