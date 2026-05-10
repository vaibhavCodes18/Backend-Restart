import prisma from "../config/prisma.js";

export const createProject = async (data, workspaceId) => {
  const { name } = data;

  try {
    if (!name || !workspaceId) {
      throw new Error("Name and WorkspaceId are required.");
    }

    const project = await prisma.project.create({
      data: {
        name,
        workspace: {
          connect: { id: Number(workspaceId) },
        },
      },
    });
    return project;
  } catch (error) {
    throw error;
  }
};

export const getAllProjectsInsideWorkspace = async (userId, workspaceId) => {
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
    return await tx.project.findMany({
      where: {
        workspaceId: Number(workspaceMember.workspaceId),
      },
      select: {
        id: true,
        name: true,
        workspaceId: true,
      },
    });
  });
};
export const getProjectDetail = async (projectId) => {
  try {
    return await prisma.project.findUnique({
      where: {
        id: Number(projectId),
      },
      include: {
        tasks: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (data, workspaceId, projectId) => {
  return await prisma.project.update({
    where: {
      id: Number(projectId),
      workspaceId: Number(workspaceId),
    },
    data,
  });
};
