const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    quantity: [{
        type: Number,
        required: true
    }],
}, {
    timestamps: true 
});

module.exports = mongoose.model('order', orderSchema);