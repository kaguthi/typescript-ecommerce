import { Router } from "express";
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } from "../controllers/productController.js";
import verifyToken from "../middleware/useMiddleware.js";
const router = Router()

router.get('/', verifyToken, getAllProducts);
router.get('/:id', verifyToken,  getProductById);
router.post('/create', verifyToken, createProduct);
router.put('/update/:id', verifyToken, updateProduct);
router.delete('/delete/:id', verifyToken, deleteProduct)

export default router;