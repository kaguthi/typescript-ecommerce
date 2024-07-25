const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: [{
        type: String,
        required: true
    }],
    quantity: [{
        type: Number,
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('order', orderSchema);