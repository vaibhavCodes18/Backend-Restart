import prisma from "../config/prisma.js"
import * as jwtUtil from "../utils/jwt.js";

export const register = async (data) => {
  return await prisma.user.create({
    data: {
      ...data,
      password: await jwtUtil.hashPassword(data.password),
    },
    select:{
        id:true,
        name:true,
        email:true
    }
  });
};

export const login = async (data) => {
    const user = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    })
    if(!user) throw new Error("User not found");

    const isPasswordValid = await jwtUtil.comparePassword(data.password, user.password);
    if(!isPasswordValid) throw new Error("Invalid credentials");

    const accessToken = await jwtUtil.generateAccessToken({id:user.id, email:user.email})
    const refreshToken = await jwtUtil.generateRefreshToken({id:user.id, email:user.email})

    await prisma.refreshToken.create({
        data:{
            userId:user.id,
            token:refreshToken,
            expiresAt:new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            isRevoked:false
        }
    })

    return {
        accessToken,
        refreshToken,
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    };
}

// add admin

