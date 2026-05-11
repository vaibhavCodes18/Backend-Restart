import prisma from "../config/prisma.js";

export const workspaceAccess = async (req, res, next) => {
  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: {
      userId: req.user.id,
      workspaceId: Number(req.params.workspaceId),
    },
  });

  if (!workspaceMember) {
    return res.status(403).json({
      message: "Forbidden. Only owner and admin can perform this action",
    });
  }

  req.workspaceMember = workspaceMember;

  next();
};
