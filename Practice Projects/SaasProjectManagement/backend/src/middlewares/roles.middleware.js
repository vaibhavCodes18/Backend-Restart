import { WorkspaceRole } from "@prisma/client";
import prisma from "../config/prisma.js";

export const allowRoles = (...roles) => {
  return async (req, res, next) => {
    const workspaceMember = await prisma.workspaceMember.findFirst({
      where: {
          userId: req.user.id,
          workspaceId: Number(req.params.workspaceId),
      },
    });

    if (!workspaceMember) {
      return res.status(404).json({ error: "Workspace member not found. Only owner and admin can add members" });
    }

    if (!roles.includes(workspaceMember.role)) {
      return res.status(403).json({ error: "Forbidden. Only owner and admin can perform this action" });
    }
    next();
  };
};
