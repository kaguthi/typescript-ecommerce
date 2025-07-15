import paymentSchema from '../models/paymentModel.js';

async function callBack(req, res) {
    try {
        const stkCallback = req.body?.Body?.stkCallback;
        const resultCode = stkCallback?.ResultCode;

        if (resultCode === undefined) {
            console.error('Invalid callback structure:', req.body);
            return res.status(400).json({ message: 'Invalid callback structure', error: 'Missing ResultCode' });
        }

        if (resultCode !== 0) {
            console.error('STK Push failed:', stkCallback?.ResultDesc);
            return res.status(400).json({
                message: 'STK Push failed',
                error: stkCallback?.ResultDesc
            });
        }

        const items = stkCallback?.CallbackMetadata?.Item || [];
        const amount = items.find(item => item.Name === 'Amount')?.Value;
        const receiptNumber = items.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
        const transactionDate = items.find(item => item.Name === 'TransactionDate')?.Value;
        const phoneNumber = items.find(item => item.Name === 'PhoneNumber')?.Value;

        if (!amount || !receiptNumber || !transactionDate || !phoneNumber) {
            return res.status(400).json({
                message: 'Missing transaction metadata',
                error: { amount, receiptNumber, transactionDate, phoneNumber }
            });
        }

        // Optional: Prevent duplicate transactions
        const existing = await paymentSchema.findOne({ ReceiptNumber: receiptNumber });
        if (existing) {
            return res.status(200).json({ message: 'Duplicate transaction ignored.' });
        }

        await paymentSchema.create({
            amount,
            ReceiptNumber: receiptNumber,
            TransactionDate: transactionDate,
            phoneNumber
        });

        res.status(200).json({
            message: 'Callback received successfully.',
            data: { amount, receiptNumber, transactionDate, phoneNumber }
        });

    } catch (error) {
        console.error('Error processing callback:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export default callBack;
