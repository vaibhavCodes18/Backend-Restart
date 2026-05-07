import prisma from "../config/prisma.js";

export const addProduct = async (data) => {
    return await prisma.product.create({
        data
    })
}

export const getAllProducts = async () => {
    return await prisma.product.findMany()
}

export const getProductById = async (id) => {
    
    return await prisma.product.findUnique({
        where:{
            id:Number(id)
        }
    })
}

export const deleteProduct = async (id) => {
    return await prisma.product.delete({
        where:{
            id:Number(id)
        }
    })
}

export const updateProduct = async (id, data) => {
    return await prisma.product.update({
        where:{
            id:Number(id)
        },
        data
    })
}