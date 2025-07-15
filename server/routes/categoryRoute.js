import { getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { Router } from "express";
import verifyToken from "../middleware/useMiddleware.js";

const router = Router()

router.get("/", verifyToken, getAllCategory);
router.get("/:id", verifyToken, getCategoryById);
router.post("/create", verifyToken, createCategory);
router.put("/update/:id", verifyToken, updateCategory);
router.delete("/delete/:id", verifyToken, deleteCategory);

export default router;