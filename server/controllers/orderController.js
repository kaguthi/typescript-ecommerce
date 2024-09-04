const Order = require('../model/orderModel');
const mongoose = require('mongoose')

async function getOrder(req, res) {
    const userRole = req.user?.role;
    if (!userRole || userRole !== "admin") {
        return res.status(401).json({ message: "Access Denied: Admins only"});
    }
    try {
        const orderList = await Order.find()
            .populate("userId", "username email profileImage")
            .populate("productId", "name price image");
        res.status(200).json(orderList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getLatestOrder(req, res) {
   const userRole = req.user?.role;
   if (!userRole || userRole !== "admin") {
        return res.status(401).json({ message : "Access Denied: Admins only."})
   }
   try {
        const lastetOrder = await Order.find()
            .populate("userId", "username email profileImage")
            .populate("productId", "name price image")
            .sort({ createdAt : -1})
            .limit(5);
        res.status(200).json(lastetOrder);
   } catch (error) {
        res.status(500).json({ message: error.message })
   }
}

async function getOrderByUserId(req, res) {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const userOrders = await Order.find({ userId })
            .populate("userId", "username email profileImage")
            .populate("productId", "name price image");
        if (!userOrders || userOrders.length === 0) {
            return res.status(404).json({ message: "No orders found for the provided user ID" });
        }
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getOrderById(req, res) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid order ID" });
    }
    try {
        const orderDetail = await Order.findById(id)
            .populate("userId", "username email profileImage")
            .populate("productId", "name price image");
        if (!orderDetail) {
            return res.status(404).json({ message: "No order found for the provided Order ID" });
        }
        res.status(200).json(orderDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getOrder, getOrderByUserId, getOrderById, getLatestOrder };
