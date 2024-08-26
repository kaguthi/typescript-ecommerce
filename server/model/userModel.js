const mongoose = require('mongoose');

const User = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('User', User);