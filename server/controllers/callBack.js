function callBack(req, res) {
    try {
        const result_code = req.body?.Body?.stkCallback?.ResultCode;

        if (result_code === undefined) {
            console.error('Invalid callback structure:', req.body);
            return res.status(400).json({ message: 'Invalid callback structure', error: 'Missing ResultCode' });
        }

        if (result_code !== 0) {
            console.error('STK Push failed:', req.body.Body.stkCallback.ResultDesc);
            return res.status(400).json({ 
                message: 'STK Push failed', 
                error: req.body.Body.stkCallback.ResultDesc 
            });
        }

        const data = req.body?.Body?.stkCallback?.CallbackMetadata?.Item || [];

        res.status(200).json({ 
            message: 'Callback received successfully.', 
            data 
        });

    } catch (error) {
        console.error('Error processing callback:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = { callBack };
