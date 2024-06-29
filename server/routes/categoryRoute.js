const {getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory} = require("../controllers/categoryController");
const express = require("express")
const router = express.Router()
const verifyToken = require("../middleware/useMiddleware")


router.get("/", verifyToken, getAllCategory);
router.get("/:id", verifyToken, getCategoryById);
router.post("/create", verifyToken, createCategory);
router.put("/update/:id", verifyToken, updateCategory);
router.delete("/delete/:id", verifyToken, deleteCategory);

module.exports = router;