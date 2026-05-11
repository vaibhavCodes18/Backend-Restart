import { WorkspaceRole } from "@prisma/client";
import prisma from "../config/prisma.js";

export const allowRoles = (...roles) => {
  return async (req, res, next) => {
    const workspaceMember = req.workspaceMember;

    if (!workspaceMember) {
      return res
        .status(404)
        .json({ error: "You're not a member of this workspace." });
    }

    if (!roles.includes(workspaceMember.role)) {
      return res.status(403).json({
        error: "Forbidden. Only owner and admin can perform this action",
      });
    }
    next();
  };
};
