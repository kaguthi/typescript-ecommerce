import { Router } from 'express';
import useMiddleware from "../middleware/useMiddleware.js";
import { getOrder, getOrderByUserId, getOrderById, getLatestOrder } from "../controllers/orderController.js";
const router = Router();

/**
 * @swagger
 * /order:
 *  get:
 *      tags:
 *          - Order
 *      summary: Retrieve list of order
 */
router.get('/', useMiddleware ,getOrder);
/**
 * @swagger
 * /order/lastestOrder:
 *  get:
 *      tags:
 *          - Order
 *      summary: Get latest order
 */
router.get('/latestOrder', useMiddleware, getLatestOrder)
/**
 * @swagger
 * /order/:id:
 *  get:
 *      tags:
 *          - Order
 *      summary: Get order by user id
 */
router.get('/:id', useMiddleware, getOrderByUserId) 
/**
 * @swagger
 * /order/orderById/:id:
 *  get:
 *      tags:
 *          - Order
 *      summary: Get order by order id
 */
router.get('/orderById/:id', useMiddleware, getOrderById) 

export default router;