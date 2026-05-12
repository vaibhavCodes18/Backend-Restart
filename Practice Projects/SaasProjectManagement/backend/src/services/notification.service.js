import prisma from "../config/prisma.js";

export const getNotifications = async (userId) => {
  return await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: "desc",
    },
    take: 10,
  });
};
