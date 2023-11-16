import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const key = process.env.JWT_SECRET

const createJWT = (payload) => {
    // let payload = { foo: 'bar' }
    let token = null
    try {
        token = jwt.sign(payload, key, { algorithm: 'HS256' });
    } 
    catch (err) {
        console.log(err) 
    }
    // console.log(token)
    return token
}

const verifyToken = (token) => {
    let decoded = null
    try {
        decoded = jwt.verify(token, key)
    } 
    catch (err) {
        console.log(err)
    }
    // console.log(decoded)
    return decoded
}

export default {createJWT, verifyToken}