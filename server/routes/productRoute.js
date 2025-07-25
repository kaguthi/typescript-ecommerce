import { Router } from "express";
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } from "../controllers/productController.js";
import verifyToken from "../middleware/useMiddleware.js";
const router = Router()

/**
 * @swagger
 * /products:
 *  get:
 *      tags: 
 *          - Products
 *      summary: Retrieve list of products
 *      responses:
 *          200:
 *              description: List of products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: string
 *                                  name: 
 *                                      type: string
 *                                  image: 
 *                                      type: string
 *                                  publicId:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *          401:
 *              description: Unauthorized
 */

router.get('/', verifyToken, getAllProducts);
/**
 * @swagger
 * /products/:id:
 *  get:
 *      tags: 
 *          - Products
 *      summary: Retrieve product with product Id
 */
router.get('/:id', verifyToken,  getProductById);
/**
 * @swagger
 * /products/create:
 *  post:
 *      tags: 
 *          - Products
 *      summary: Create new products
 */
router.post('/create', verifyToken, createProduct);
/**
 * @swagger
 * /products/update/:id:
 *  put:
 *      tags: 
 *          - Products
 *      summary: Update product by product id
 */
router.put('/update/:id', verifyToken, updateProduct);
/**
 * @swagger
 * /products/delete/:id:
 *  delete:
 *      tags: 
 *          - Products
 *      summary: Delete product by product id
 */
router.delete('/delete/:id', verifyToken, deleteProduct)

export default router;