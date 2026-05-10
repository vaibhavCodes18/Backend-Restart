import prisma from "../config/prisma.js";

export const createProject = async (data) => {
  const { name, workspaceId } = data;

  try {
    if (!name || !workspaceId) {
      throw new Error("Name and WorkspaceId are required.");
    }

    const project = await prisma.project.create({
      data: {
        name,
        workspace: {
          connect: { id: workspaceId },
        },
      },
    });
    return project;
  } catch (error) {
    throw error;
  }
};
