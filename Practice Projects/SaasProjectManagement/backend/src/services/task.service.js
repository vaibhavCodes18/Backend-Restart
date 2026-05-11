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

export const getAllTasksInsideProject = async (projectId) => {
  return await prisma.task.findMany({
    where: {
      project: {
        id: Number(projectId),
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

export const getTaskById = async (taskId) => {
  return await prisma.task.findUnique({
    where: {
      id: Number(taskId),
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

export const updateTaskStatus = async (taskId, status) => {
  return await prisma.$transaction(async (tx) => {
    return await tx.task.update({   
      where: {
        id: Number(taskId),
      },
      data: {
        status,  
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
  });
};

export const assignToAnotherUser = async (taskId, assigneeId) => {
  return await prisma.$transaction(async (tx) => {
    const task = await tx.task.findUnique({
      where: {
        id: Number(taskId),
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    const user = await tx.user.findUnique({
      where: {
        id: Number(assigneeId),
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await tx.task.update({
      where: {
        id: task.id,
      },
      data: {
        assignee: {
          connect: { id: user.id },
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
  });
};

export const deleteTask = async (taskId) => {
  return await prisma.$transaction(async (tx) => {
    return await tx.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        deletedAt: new Date(),
      },
    });
  });
};