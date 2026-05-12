import { TaskStatus } from "@prisma/client";
import prisma from "../config/prisma.js";

export const createTask = async (data, projectId, userId) => {
  return await prisma.$transaction(async (tx) => {
    const task = await tx.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: TaskStatus.TODO,
        project: {
          connect: { id: Number(projectId) },
        },
        assignee: data.assigneeId ? {
          connect: { id: Number(data.assigneeId) },
        } : undefined,
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

    await tx.auditLog.create({
      data: {
        action: "CREATE_TASK",
        userId: Number(userId),
        entityType: "Task",
        entityId: task.id,
      },
    });

    if (data.assigneeId && Number(data.assigneeId) !== Number(userId)) {
      await tx.notification.create({
        data: {
          userId: Number(data.assigneeId),
          type: "TASK_ASSIGNED",
          message: `You have been assigned a new task: "${task.title}"`,
        },
      });
    }

    return task;
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

export const updateTaskStatus = async (taskId, status, userId) => {
  return await prisma.$transaction(async (tx) => {
    const task = await tx.task.update({   
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

    await tx.auditLog.create({
      data: {
        action: "UPDATE_TASK_STATUS",
        userId: Number(userId),
        entityType: "Task",
        entityId: task.id,
      },
    });

    if (task.assignee?.id && Number(task.assignee.id) !== Number(userId)) {
      await tx.notification.create({
        data: {
          userId: Number(task.assignee.id),
          type: "TASK_STATUS_UPDATED",
          message: `The status of your task "${task.title}" has been updated to ${status}.`,
        },
      });
    }

    return task;
  });
};

export const assignToAnotherUser = async (taskId, assigneeId, userId) => {
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

    const updatedTask = await tx.task.update({
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

    await tx.auditLog.create({
      data: {
        action: "ASSIGN_TASK",
        userId: Number(userId),
        entityType: "Task",
        entityId: task.id,
      },
    });

    if (Number(assigneeId) !== Number(userId)) {
      await tx.notification.create({
        data: {
          userId: Number(assigneeId),
          type: "TASK_ASSIGNED",
          message: `You have been assigned to task: "${updatedTask.title}".`,
        },
      });
    }

    if (task.assigneeId && Number(task.assigneeId) !== Number(assigneeId) && Number(task.assigneeId) !== Number(userId)) {
      await tx.notification.create({
        data: {
          userId: Number(task.assigneeId),
          type: "TASK_UNASSIGNED",
          message: `You have been unassigned from task: "${task.title}".`,
        },
      });
    }

    return updatedTask;
  });
};

export const deleteTask = async (taskId, userId) => {
  return await prisma.$transaction(async (tx) => {
    const task = await tx.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    await tx.auditLog.create({
      data: {
        action: "DELETE_TASK",
        userId: Number(userId),
        entityType: "Task",
        entityId: task.id,
      },
    });

    if (task.assigneeId && Number(task.assigneeId) !== Number(userId)) {
      await tx.notification.create({
        data: {
          userId: Number(task.assigneeId),
          type: "TASK_DELETED",
          message: `The task "${task.title}" assigned to you has been deleted.`,
        },
      });
    }

    return task;
  });
};