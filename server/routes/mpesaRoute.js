const express = require('express');
const { mpesaMiddleware } = require('../middleware/mpesaMiddleware');
const { mpesa }= require('../controllers/mpesaController');

const router = express.Router();
router.post('/', mpesaMiddleware, mpesa);

module.exports = router;