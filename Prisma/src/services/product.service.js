import { prisma } from "../config/prisma.js";

export const saveProduct = async (data) => {
  return await prisma.product.create({data});
}

export const getProducts = async (data) => {
  return await prisma.product.findMany();
}