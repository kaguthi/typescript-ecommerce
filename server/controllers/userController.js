import User from '../models/userModel.js';
import { createToken } from '../utils/secretToken.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import multer from 'multer';
import 'dotenv/config';
import jwt from 'jsonwebtoken'
import { mail } from '../utils/mail.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';


const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10 MB limit

// Get all user data - Admin only
async function getUsers(req, res) {
  try {
    const userRole = req.user?.role;
    if (!userRole || userRole !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // Optionally exclude sensitive fields like password & OTP
    const users = await User.find({}, "-password -otp");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
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

            if (!validator.isStrongPassword(req.body.password, {minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1})) {
                throw new Error("Password is not strong 8-15 characters required")
            }
            const result = await uploadImage(req.file.buffer, {
                folder: 'uploads',
                resource_type: 'auto'
            });
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const otp = Math.floor(1000 + Math.random() * 900000);
            const mailOption = {
                from: `"E_Buy Stores" <${process.env.EMAIL_FROM}>`,
                to: req.body.email,
                subject: "Your OTP Code",
                text: `Your OTP code is ${otp}`,
            };
            mail(mailOption);
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                profileImage: req.file ? result.secure_url : null,
                publicId: req.file ? result.public_id : null,
                role: req.body.role,
                createdAt: Date.now(),
                otp: otp
            };
            const createdUser = await User.create(user);
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
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: true,
                secure: true
            });

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
    if (userRole != "admin" || !userRole) {
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
            const deleteImageResult = await deleteImage(existingUser.publicId);
            if (deleteImageResult.result !== 'ok') {
                return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
            }
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
                    const deleteImageResult = await deleteImage(existingUser.publicId);
                    if (deleteImageResult.result !== 'ok') {
                        return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
                    }
                    const result = await uploadImage(req.file.buffer, {
                        folder: 'uploads',
                        resource_type: 'auto'
                    });
                    updateData.profileImage = result.secure_url;
                    updateData.publicId = result.public_id;
                }
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

async function verifyOtp(req, res) {
    const { otp, userId } = req.body;

    if (!otp || !userId) {
        return res.status(400).json({ message: "OTP and User ID are required", success: false });
    }

    try {
        const user = await User.findOne({ _id: userId, otp });

        if (!user) {
            return res.status(404).json({ message: "User not found or OTP is invalid", success: false });
        }

        const otpExpiryTime = 5 * 60 * 1000; // 5 minutes
        const timeElapsed = Date.now() - user.otpCreatedAt;

        if (timeElapsed > otpExpiryTime) {
            return res.status(400).json({ message: "OTP has expired", success: false });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpCreatedAt = null;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

async function confirmEmail(req, res){
    const {email} = req.body;
    if (!email) {  
        return res.status(400).json({ message: "Email is required", success: false });
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const otp = Math.floor(1000 + Math.random() * 900000);
        const mailOption = {
            from: `"E_Buy Stores" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_TO,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}`,
        };
        mail(mailOption);
        user.resetOtp = otp; 
        user.resetOtpCreatedAt = Date.now();
        await user.save();
        res.status(200).json({ message: "OTP sent to your email", success: true }); 
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });   
    }
}

async function verifyResetOtp(req, res) {
    const { otp, email } = req.body;

    if (!otp || !email) {
        return res.status(400).json({ message: "OTP and Email are required", success: false });
    }

    try {
        const user = await User.findOne({ email: email, resetOtp: otp });

        if (!user) {
            return res.status(404).json({ message: "User not found or OTP is invalid", success: false });
        }

         if (!user.resetOtpCreatedAt) {
            return res.status(400).json({ message: "OTP timestamp missing. Please request a new OTP.", success: false });
        }

        const otpExpiryTime = 5 * 60 * 1000; // 5 minutes
        const timeElapsed = Date.now() - user.resetOtpCreatedAt;

        if (timeElapsed > otpExpiryTime) {
            return res.status(400).json({ message: "OTP has expired", success: false });
        }

        user.resetOtp = null;
        user.resetOtpCreatedAt = null;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

async function resetPassword(req, res) {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password are required", success: false });
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

export {getUsers, createUser, loginUser, deleteUser, updateUser, getUserById, renewToken, verifyOtp, confirmEmail, verifyResetOtp, resetPassword};