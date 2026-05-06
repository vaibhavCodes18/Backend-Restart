import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
}

export const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

export const generateAccessToken = (id,email)=>{
    return jwt.sign({id,email},process.env.JWT_SECRET,{expiresIn:"1h"})
}

export const generateRefreshToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})
}

export const verifyAccessToken = (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET)
}

export const verifyRefreshToken = (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET)
}