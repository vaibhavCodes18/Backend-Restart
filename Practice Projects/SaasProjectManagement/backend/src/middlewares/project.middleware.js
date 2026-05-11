import prisma from "../config/prisma.js";

export const projectAccess = async (req, res, next) => {
  const project = await prisma.project.findFirst({
    where: {
      id: Number(req.params.projectId),
    },
    include: {
      workspace: {
        include: {
          members: true,
        },
      },
    },
  });

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: {
      userId: Number(req.user.id),
      workspaceId: Number(project.workspaceId),
    },
    select:{
        id: true,
        role: true,
        userId: true,
        workspaceId: true,
    }
  });

  req.project = project  

  req.workspaceMember = workspaceMember;

  next();
};
