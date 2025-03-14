const express = require('express');
const { mpesaMiddleware } = require('../middleware/mpesaMiddleware');
const { mpesa }= require('../controllers/mpesaController');
const { callBack } = require('../controllers/callBack');

const router = express.Router();
router.post('/mpesa', mpesaMiddleware, mpesa);
router.post('/callback', callBack)

module.exports = router;