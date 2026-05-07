import { Role } from "@prisma/client";
import prisma from "../config/prisma.js";
import * as jwtUtil from "../utils/jwt.js";

export const getProfile = async (userId) => {
    return await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            id:true,
            name:true,
            email:true,
            role:true
        }
    })
}

export const addAdmin = async (data) => {

    const user = await prisma.user.findUnique({
        where:{
            email:data.email,
            role:Role.ADMIN
        }
    })
    if(user) throw new Error("Admin email already exists");

    const admins = await prisma.user.findFirst({
        where:{
            role:Role.ADMIN
        }
    })
    if(admins) throw new Error("Only one admin is allowed");

    return await prisma.user.create({
        data:{
            ...data,
            role: Role.ADMIN,
            password: await jwtUtil.hashPassword(data.password),
        },
        select:{
            id:true,
            name:true,
            email:true,
            role:true
        }
    })
}