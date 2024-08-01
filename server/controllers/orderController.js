const order = require('../model/orderModel')

async function getOrder(req, res) {
    try {
      const orderList = await order.find().populate("userId", "username email profileImage").populate("productId", "name price image");
      res.status(200).json(orderList)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}

async function getOrderByUserId(req, res) {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ message: "No user id found"})
    }
    try {
        const userOrder = await order.find({ userId: userId }).populate("userId", "username email profileImage").populate("productId", "name price image");
        if (!userOrder || userOrder.length === 0) {
            return res.status(404).json({ message: "No orders found for the provided user ID" });
        }
        res.status(200).json(userOrder)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getOrderById(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "No id found."});
    }
    try {
        const orderList = await order.findById(id).populate("userId", "username email profileImage").populate("productId", "name price image");
        if (!orderList || orderList.length === 0) {
            return res.status(404).json({ message: "No order found for the provided Order ID"});
        }
        res.status(200).json(orderList)
    } catch (error) {
       res.status(500).json({ message: error.message }) 
    }
}

module.exports = {getOrder, getOrderByUserId, getOrderById }