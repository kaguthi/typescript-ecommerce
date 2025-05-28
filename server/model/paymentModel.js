const mongoose = require('mongoose')

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

module.exports = mongoose.model('Payment', paymentSchema)