const express = require("express")
const { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } = require("../controllers/productController")
const router = express.Router()
const verifyToken = require("../middleware/useMiddleware")

router.get('/', verifyToken, getAllProducts);
router.get('/:id', verifyToken,  getProductById);
router.post('/create', verifyToken, createProduct);
router.put('/update/:id', verifyToken, updateProduct);
router.delete('/delete/:id', verifyToken, deleteProduct)

module.exports = router;