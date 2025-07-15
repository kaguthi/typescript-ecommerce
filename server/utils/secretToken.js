import jwt from 'jsonwebtoken';
import 'dotenv/config';

function createToken(id){
    return jwt.sign({id}, process.env.ACCESS_TOKEN_KEY)
}

function generateNewToken (id) {
    return sign({id}, process.env.REFRESH_TOKEN_KEY)
}

export {createToken, generateNewToken};