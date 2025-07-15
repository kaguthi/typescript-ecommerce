import { Router } from 'express';
import { makePaymentStripe } from '../controllers/paymentController.js';

const router = Router()

router.post('/', makePaymentStripe);

export default router;