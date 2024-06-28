const express = require('express');
const {getUsers, createUser, loginUser, deleteUser, updateUser, getUserById} = require("../controllers/userController");
const useMiddleware = require('../middleware/useMiddleware')

const router = express.Router();

router.get("/users", useMiddleware, getUsers);
router.get("/users/:id", useMiddleware, getUserById);
router.post("/register", createUser);
router.post("/login", loginUser);
router.delete("/delete/:id", useMiddleware, deleteUser);
router.put("/update/:id", useMiddleware, updateUser);


module.exports = router;