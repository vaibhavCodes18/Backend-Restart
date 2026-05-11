import { TaskStatus } from "@prisma/client";
import prisma from "../config/prisma.js";

export const createTask = async (data, projectId) => {
  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: TaskStatus.TODO,
      project: {
        connect: { id: Number(projectId) },
      },
      assignee: {
        connect: { id: Number(data.assigneeId) },
      },
    },
    include: {
      project: {
        select: {
          id: true,
          name: true,
        },
      },
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};
