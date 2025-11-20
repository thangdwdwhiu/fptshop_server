import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secretKey = process.env.JWT_SECRET ?? null

const generateJWT = (customerID, fullname, email) =>{
    return jwt.sign({customerID: customerID,fullname: fullname,email: email, time: Date.now()}, secretKey, {algorithm: 'HS256', expiresIn: '1h'})
}

const verifyJWT = (token) =>{

    return jwt.verify(token, secretKey, {algorithms: ['HS256']})

}
 

export {generateJWT, verifyJWT}