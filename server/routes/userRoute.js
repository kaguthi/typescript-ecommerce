import { Router } from 'express';
import { getUsers, createUser, loginUser, deleteUser, updateUser, getUserById, renewToken, verifyOtp, confirmEmail, resetPassword, verifyResetOtp } from "../controllers/userController.js";
import useMiddleware from '../middleware/useMiddleware.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *      tags: 
 *          - Users
 *      summary: Retrieve a list of users
 *      responses: 
 *          200:
 *              description: A list of users.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                    type: string
 *                                    example: 1234567890
 *                                  username:
 *                                    type: string
 *                                    example: johndoe
 *                                  email:
 *                                    type: string
 *                                    example: johndoe@example.com
 *                                  profileImage:
 *                                    type: string
 *                                    example: http://example.com/images/johndoe.jpg
 *                                  createdAt:
 *                                    type: string
 *                                    example: 2023-10-01T12:34:56.789Z
 *                                  role:
 *                                    type: string
 *                                    example: user
 */

router.get("/users", useMiddleware, getUsers);
/**
 * @swagger
 * /users/:id:
 *  get:
 *      tags:
 *          - Users
 *      summary: Retrieve user with User id
 *      responses:
 *          200:
 *              description: A single user.
 *              content:
 *                 application/json:
 *                    schema:   
 *                        type: array   
 *                        items:
 *                            type: object
 *                            properties:
 *                              id:
 *                                type: string
 *                                example: 1234567890
 *                              username:
 *                                type: string
 *                                example: johndoe
 *                              email:
 *                                type: string
 *                                example: johndoe@example.com
 */
router.get("/users/:id", useMiddleware, getUserById);
/**
 * @swagger
 * /renewtoken:
 *   get:
 *      tags:
 *          - Users
 *      summary: Renew your jwt token
 */
router.get("/renewtoken", renewToken)
/**
 * @swagger
 * /register:
 *  post:
 *      tags:
 *          - Users
 *      summary: Register new users
 */
router.post("/register", upload.single('profileImage'), createUser);
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.post("/login", loginUser);
/**
 * @swagger
 * /delete/:id:
 *  delete:
 *      tags:
 *          - Users
 *      summary: Delete user by User id
 */
router.delete("/delete/:id", useMiddleware, deleteUser);
/**
 * @swagger
 * /update/:id:
 *  put:
 *      tags:
 *          - Users
 *      summary: Update user by User id
 */
router.put("/update/:id", useMiddleware, updateUser);
/**
 * @swagger
 * /verifyotp:
 *  post:
 *      tags:
 *          - Users
 *      summary: Verify your otp
 */
router.post("/verifyotp", verifyOtp);
/**
 * @swagger
 * /confirm-email:
 *  post:
 *      tags:
 *          - Users
 *      summary: confirm email
 */
router.post("/confirm-email", confirmEmail);
/**
 * @swagger
 * /reset-password:
 * post:
 *      tags:
 *          - Users 
 *      summary: Reset password
 */
router.post("/reset-password", resetPassword);
/**
 * @swagger
 * /verify-reset-otp:
 * post:
 *      tags:
 *          - Users
 *      summary: Verify resey otp
 */
router.post("/verify-reset-otp", verifyResetOtp);

export default router;