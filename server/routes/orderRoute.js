import { Router } from 'express';
import useMiddleware from "../middleware/useMiddleware.js";
import { getOrder, getOrderByUserId, getOrderById, getLatestOrder } from "../controllers/orderController.js";
const router = Router();

router.get('/', useMiddleware ,getOrder);
router.get('/latestOrder', useMiddleware, getLatestOrder)
router.get('/:id', useMiddleware, getOrderByUserId) 
router.get('/orderById/:id', useMiddleware, getOrderById) 

export default router;