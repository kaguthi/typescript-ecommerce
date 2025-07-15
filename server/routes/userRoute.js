import { Router } from 'express';
import { getUsers, createUser, loginUser, deleteUser, updateUser, getUserById, renewToken, verifyOtp, confirmEmail, resetPassword, verifyResetOtp } from "../controllers/userController.js";
import useMiddleware from '../middleware/useMiddleware.js';

const router = Router();

router.get("/users", useMiddleware, getUsers);
router.get("/users/:id", useMiddleware, getUserById);
router.get("/renewtoken", renewToken)
router.post("/register", createUser);
router.post("/login", loginUser);
router.delete("/delete/:id", useMiddleware, deleteUser);
router.put("/update/:id", useMiddleware, updateUser);
router.post("/verifyotp", verifyOtp);
router.post("/confirm-email", confirmEmail);
router.post("/reset-password", resetPassword);
router.post("/verify-reset-otp", verifyResetOtp);

export default router;