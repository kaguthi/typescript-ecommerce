const express = require('express');
const router = express.Router();
const useMiddleware = require("../middleware/useMiddleware");
const { getOrder, getOrderByUserId, getOrderById, getLatestOrder } = require("../controllers/orderController")

router.get('/', useMiddleware ,getOrder);
router.get('/latestOrder', useMiddleware, getLatestOrder)
router.get('/:id', useMiddleware, getOrderByUserId) 
router.get('/orderById/:id', useMiddleware, getOrderById) 

module.exports = router;