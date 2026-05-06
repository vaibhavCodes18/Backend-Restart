import { prisma } from "../config/prisma.js";

export const createOrder = async (data) => {
  return await prisma.order.create({
    data: {
      quantity: data.quantity,
      user: { connect: { id: data.userId } },
      product: { connect: { id: data.productId } },
    },
  });
};

export const getOrders = async () => {
  return await prisma.order.findMany({
    include: {
      user: true,
      product: true
    }
  });
};
