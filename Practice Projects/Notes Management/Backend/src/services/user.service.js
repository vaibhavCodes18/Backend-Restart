import prisma from "../config/prisma.js";
import * as jwt from "../utils/jwt.js";

export const createUser = async (data) => {
  return await prisma.user.create({
    data: {
      ...data,
      password: await jwt.hashPassword(data.password)
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt:true,
      updatedAt:true
    }
  })
}

export const loginUser = async(data) => {
  const user = await prisma.user.findUnique({
    where :{
      email: data.email
    },
    select:{
      id: true,
      email: true,
      name: true,
      password:true
    }
  })
  if(!user) 
    throw new Error("User not found");
  
  const isPasswordValid = await jwt.verifyPassword(data.password, user.password)
  if(!isPasswordValid)
    throw new Error("Invalid Password")

  const accessToken = jwt.generateAccessToken(user.id,user.email)
  const refreshToken = jwt.generateRefreshToken(user.id,user.email)

  await prisma.refreshToken.create({
    data: {
      token:refreshToken,
      user: {
        connect: {
          id: user.id
        }
      }
    }
  })

  return {
    user,
    accessToken,
    refreshToken
  }
    
} 

