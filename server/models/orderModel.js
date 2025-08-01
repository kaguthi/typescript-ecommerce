import mongoose from 'mongoose';
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
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'processing',
        enum: ['processing', 'transit', 'delivered']
    }
}, {
    timestamps: true 
});

export default mongoose.model('Order', orderSchema);