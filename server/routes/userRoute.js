const express = require('express');
const {getUsers, createUser, loginUser, deleteUser, updateUser, getUserById, renewToken, verifyOtp, confirmEmail, resetPassword, verifyResetOtp} = require("../controllers/userController");
const useMiddleware = require('../middleware/useMiddleware')

const router = express.Router();

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

module.exports = router;