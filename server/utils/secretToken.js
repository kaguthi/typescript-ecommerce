const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

function createToken(id){
    return jwt.sign({id}, process.env.ACCESS_TOKEN_KEY)
}

module.exports = createToken;