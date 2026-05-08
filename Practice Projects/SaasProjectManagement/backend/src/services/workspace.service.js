import { WorkspaceRole } from "@prisma/client";
import prisma from "../config/prisma.js";

export const createWorkspace = async (data, ownerId) => {
  return await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data,
    });

    await tx.workspaceMember.create({
      data: {
        role: WorkspaceRole.OWNER,
        user: {
          connect: {
            id: ownerId,
          },
        },
        workspace: {
          connect: {
            id: workspace.id,
          },
        },
      },
    });

    return workspace;
  });
};

export const getMyWorkspaces = async (userId) => {
  return await prisma.workspaceMember.findMany({
    where: {
      userId,
    },
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
        },
      },
    }
  });
};

export const getWorkspaceById = async (workspaceId) => {
  return await prisma.workspace.findUnique({
    where: {
      id: Number(workspaceId),
    },
    include: {
      members: {
        select: {
          id: true,
          workspaceId: true,
          userId: true,
          role: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
};
