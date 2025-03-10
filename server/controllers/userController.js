const User = require("../model/userModel");
const bcrypt = require('bcrypt');
const {createToken, generateNewToken} = require('../utils/secretToken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, '../uploads');
const validator = require('validator');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const { sendMessage } = require('../utils/sendSms');

dotenv.config();

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// get alluser data from the database
async function getUsers(req, res) {
    const userRole = req.user.role;
    if (userRole !== "admin" || !userRole) {
        return res.status(401).json({ message : "Access Denied: Admin Only"})
    }
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get use by Id
async function getUserById(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// create user function
async function createUser(req, res) {
    upload.single('profileImage')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            if (!validator.isEmail(req.body.email)) {
                throw new Error("Email is in valid")
            }

            if (!validator.isStrongPassword(req.body.password)) {
                throw new Error("Password is not strong 8-15 characters required")
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                profileImage: req.file ? req.file.filename : null,
                role: req.body.role,
                createdAt: Date.now()
            };
            const createdUser = await User.create(user);
            const token = createToken(user.username);
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: true,
                secure: true
            });
            res.status(201).json({ message: "User created successfully", user: createdUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}

// login the user function
async function loginUser(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password." });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {
            const token = createToken(user._id);
            const refresh_token = generateNewToken(user._id)
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: true,
                secure: true
            });
            res.cookie("refresh_token", refresh_token, {
                withCredentials: true,
                httpOnly: true,
                secure: true
            })
            const message = "This is your OTP 0000";
            const phone = 'phone number'
            // sendMessage(phone, message);
            res.status(200).json({ message: "Login successful", success: true, token: token, username: user.username, profileImage: user.profileImage, userId: user._id, role: user.role });
        } else {
            res.status(400).json({ message: "Invalid username or password.", success: false });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again", success: false });
    }
}

// delete user data
async function deleteUser(req, res) {
    const userRole = req.user.role;
    if (userRole !== "admin" || !userRole) {
        return res.status(401).json({ message: "Access Denied: Admin Only"});
    }
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "User ID is required." });
    }
    try {
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found"})
        }
        if (existingUser.profileImage) {
            const filePath = path.join(uploadDir, path.basename(existingUser.profileImage))
            fs.promises.unlink(filePath)
                .then(() => console.log("Image file deleted successfully"))
                .catch(error => console.error(error.message))
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update user details
async function updateUser(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "User ID is required." });
    }
    upload.single('profileImage')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message })
        }
        try {
            const existingUser = await User.findById(id)
            if (!existingUser) {
                return res.status(404).json({ message: "User not found."})
            }
            const updateData = { ...req.body, updatedAt: Date.now() };
            if (req.file) {
                if (existingUser.profileImage) {
                    const oldImagePath = path.join(uploadDir, path.basename(existingUser.profileImage))
                    fs.promises.unlink(oldImagePath)
                        .then(() => console.log("Image file deleted successfully"))
                        .catch(error => console.error(error.message))
                }
                updateData.profileImage = req.file.filename;
            }
            const user = await User.findByIdAndUpdate(id, updateData, { new: true });
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            res.status(200).json({ message: "User updated successfully", user });
        } catch (error) { 
            res.status(500).json({ message: error.message })
        }
    })
}

async function renewToken(req, res) {
    const refreshToken = req.headers['authorization'] || req.cookies.refresh_token;
    if(!refreshToken) {
        return res.status(403).json({ message: "No Token found."})
    } 

    let actualToken = refreshToken;
    if (refreshToken.startsWith('Bearer ')) {
        actualToken = refreshToken.split(' ')[1];
    }
    try {
        const decoded = jwt.verify(actualToken, process.env.REFRESH_TOKEN_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "No user found by that id" });
        }
        req.user = user
        const token = createToken(req.user._id)
        res.cookie("token" , token, {
            withCredentials: true,
            httpOnly: true,
            secure: true
        })
        res.status(200).json({ message: "token refreshed successfully"})
    } catch (error) {
        res.status(401).json({ message: error.message })
    }

}

module.exports = {getUsers, createUser, loginUser, deleteUser, updateUser, getUserById, renewToken};