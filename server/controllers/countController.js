const Product = require('../model/productModel');
const User = require('../model/userModel');


async function getDocumentCount (req, res) {
    const userRole = req.user?.role;
    if (!userRole || userRole !== "admin") {
        return res.status(401).json({ message: "Access Denied: Admin Only."});
    }

    try {
        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();
        res.status(200).json({ productCount: productCount, userCount: userCount })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = getDocumentCount;