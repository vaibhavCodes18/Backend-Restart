import { OrderStatus } from "@prisma/client";
import prisma from "../config/prisma.js";

export const placeOrder = async (userId, orderData) => {
  // trancation start
  return await prisma.$transaction(async (tx) => {
    let total = 0;
    const processedItems = [];

    for (const item of orderData.items) {
      const product = await tx.product.findUnique({
        where: {
          id: Number(item.productId),
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < Number(item.quantity)) {
        throw new Error("Product out of stock");
      }
      const totalAmount = product.price * Number(item.quantity);

      total += totalAmount;

      processedItems.push({
        product,
        quantity: Number(item.quantity),
        price: totalAmount,
      });
    }

    const order = await tx.order.create({
      data: {
        userId,
        status: OrderStatus.PENDING,
        total,
      },
    });

    for (const item of processedItems) {
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: Number(item.product.id),
          quantity: Number(item.quantity),
          price: item.price,
        },
      });
      await tx.product.update({
        where: {
          id: Number(item.product.id),
        },
        data: {
          stock: {
            decrement: Number(item.quantity),
          },
        },
      });
    }

    return order;
  });
};

export const getOrderHistoryByUserId = async (userId) => {
  return await prisma.order.findMany({
    where: {
      userId: Number(userId),
    },
    include: {
      orderItems: true,
    },
  });
};

export const getOrderById = async (orderId) => {
  return await prisma.order.findUnique({
    where: {
      id: Number(orderId),
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
};
