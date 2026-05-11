import prisma from "../config/prisma.js";

export const taskAccess = async (req, res, next) => {
  const task = await prisma.task.findFirst({
    where: {
      id: Number(req.params.taskId),
    },
    include: {
      project: {
        include: {
          workspace: {
            include: {
              members: true,
            },
          },
        },
      },
    },
  });

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: {
      userId: Number(req.user.id),
      workspaceId: Number(task.project.workspaceId),
    },
    select:{
        id: true,
        role: true,
        userId: true,
        workspaceId: true,
    }
  });

  req.task = task;

  req.workspaceMember = workspaceMember;

  next();
};
