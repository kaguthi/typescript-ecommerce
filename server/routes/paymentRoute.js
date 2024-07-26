const express = require('express');
const { makePaymentStripe, getOrder } = require('../controllers/paymentController');
const router = express.Router()
const useMiddleware = require('../middleware/useMiddleware');

router.post('/', makePaymentStripe);
router.get('/order', useMiddleware ,getOrder);

module.exports = router;