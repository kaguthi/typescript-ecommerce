const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../model/userModel');
dotenv.config();

const verification = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: "No token found" });
    }

    // If the token is in the Authorization header, extract it
    let actualToken = token;
    if (token.startsWith('Bearer ')) {
        actualToken = token.split(' ')[1];
    }

    try {
        const decoded = jwt.verify(actualToken, process.env.ACCESS_TOKEN_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "No user found by that id" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};

module.exports = verification;
