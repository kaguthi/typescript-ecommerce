import mongoose from 'mongoose';
const paymentSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    ReceiptNumber: {
        type: String,
        required: true
    },
    TransactionDate: {
        type: Date,
        default: Date.now
    },
    phoneNumber: {
        type: String,
        required: true
    },
})

export default mongoose.model('Payment', paymentSchema)