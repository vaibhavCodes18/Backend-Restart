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

// get loggedin user workspace where they present
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
    },
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

export const addMembersToWorkspace = async (data, workspaceId) => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findFirst({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingMember = await tx.workspaceMember.findFirst({
      where: {
        userId: Number(user.id),
        workspaceId: Number(workspaceId),
      },
      select: {
        id: true,
      },
    });

    if (existingMember) {
      throw new Error("User is already a member of this workspace");
    }

    const workspaceMember = await tx.workspaceMember.create({
      data: {
        role: data.role,
        user: {
          connect: {
            id: Number(user.id),
          },
        },
        workspace: {
          connect: {
            id: Number(workspaceId),
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return workspaceMember;
  });
};

export const getWorkspaceMembers = async (userId, workspaceId) => {
  return await prisma.$transaction(async (tx) => {
    const workspaceMember = await tx.workspaceMember.findFirst({
      where: {
        userId: Number(userId),
        workspaceId: Number(workspaceId),
      },
    });

    if (!workspaceMember) {
      throw new Error("You are not a member of this workspace");
    }

    return await tx.workspaceMember.findMany({
      where: {
        workspaceId: Number(workspaceId),
      },
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
    });
  });
};

export const changeMemberRole = async (userId, workspaceId, role) => {
  return await prisma.$transaction(async (tx) => {
    const workspaceMember = await tx.workspaceMember.findFirst({
      where: {
        userId: Number(userId),
        workspaceId: Number(workspaceId),
      },
    });

    if (!workspaceMember) {
      throw new Error("You are not a member of this workspace");
    }

    return await tx.workspaceMember.update({
      where: {
        id: Number(workspaceMember.id),
      },
      data: {
        role,
      },
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
        workspace: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  });
};

export const deleteMemberFromWorkspace = async(userId, workspaceId) => {
  return await prisma.$transaction(async (tx) => {
    const workspaceMember = await tx.workspaceMember.findFirst({
      where: {
        userId: Number(userId),
        workspaceId: Number(workspaceId),
      },
    });

    if (!workspaceMember) {
      throw new Error("You are not a member of this workspace");
    }

    await tx.workspaceMember.delete({
      where: {
        id: Number(workspaceMember.id),
      },
    });

    return true;
  });
};
