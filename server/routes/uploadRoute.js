import { uploadController } from "../controllers/uploadController.js";
import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), uploadController);

export default router;
