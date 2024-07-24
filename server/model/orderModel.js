const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    productId: [ {
        type: String
    }],
    createdAt: Date
});

module.exports = mongoose.model('order', orderSchema);