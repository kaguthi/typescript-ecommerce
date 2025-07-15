import getDocumentCount from '../controllers/countController.js';
import { Router } from 'express';
import useMiddleware from "../middleware/useMiddleware.js";
const router = Router();

router.get('/', useMiddleware, getDocumentCount);

export default router;