const express = require('express');
const { makePaymentStripe } = require('../controllers/paymentController');
const router = express.Router()

router.post('/', makePaymentStripe);


module.exports = router;