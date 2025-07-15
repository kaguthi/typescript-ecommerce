import { Router } from 'express';
import mpesaMiddleware from '../middleware/mpesaMiddleware.js';
import { mpesa } from '../controllers/mpesaController.js';
import callBack from '../controllers/callBack.js';

const router = Router();
router.post('/mpesa', mpesaMiddleware, mpesa);
router.post('/callback', callBack)

export default router;