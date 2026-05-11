import { WorkspaceRole } from "@prisma/client";
import prisma from "../config/prisma.js";

export const allowRoles = (...roles) => {
  return async (req, res, next) => {

    const project = await prisma.project.findUnique({
      where:{
        id: Number(req.params.projectId)
      }
    })

    const workspaceMember = await prisma.workspaceMember.findFirst({
      where: {
        userId: req.user.id,
        workspaceId: Number(req.params.workspaceId) || Number(project.workspaceId),
      },
    });

    if (!workspaceMember) {
      return res
        .status(404)
        .json({ error: "You're not a member of this workspace." });
    }

    if (!roles.includes(workspaceMember.role)) {
      return res
        .status(403)
        .json({
          error: "Forbidden. Only owner and admin can perform this action",
        });
    }
    next();
  };
};
