const Product = require('../model/productModel');
const User = require('../model/userModel');
const Order = require('../model/orderModel');

async function getDocumentCount (req, res) {
    const userRole = req.user?.role;
    if (!userRole || userRole !== "admin") {
        return res.status(401).json({ message: "Access Denied: Admin Only."});
    }

    try {
        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();
        const monthSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalPrice: {$sum: "$totalPrice"}
                }
            }
        ])
        res.status(200).json({ productCount: productCount, userCount: userCount, sales: monthSales[0].totalPrice / 200 })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = getDocumentCount;