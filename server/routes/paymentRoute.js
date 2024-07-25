const express = require('express');
const { makePaymentStripe, getOrder } = require('../controllers/paymentController');
const router = express.Router()

router.post('/', makePaymentStripe);
router.get('/order', getOrder);

module.exports = router;