const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 2 // Allow minimum 2 characters
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
  
    totalEarnings: {
        type: Number,
        default: 0
    },
    totalOrders: {
        type: Number,
        default: 0
    },
    rewardPoints: {
        type: Number,
        default: 0
    },
    membershipLevel: {
        type: String,
        default: 'Silver',
        enum: ['Bronze', 'Silver', 'Gold', 'Platinum']
    }
}, {
    timestamps: true // This adds createdAt and updatedAt automatically
});

// Create the User model if it doesn't exist
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
