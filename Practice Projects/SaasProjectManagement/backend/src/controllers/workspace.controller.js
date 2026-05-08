import * as workspaceService from "../services/workspace.service.js";

export const createWorkspace = async (req, res) => {
  return res.status(201).json({
    success: true,
    data: await workspaceService.createWorkspace(req.body, req.user.id),
    message: "Workspace Created Successfully",
  });
};

export const getMyWorkspaces = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await workspaceService.getMyWorkspaces(req.user.id),
    message: "My Workspaces Fetched Successfully",
  });
};

export const getWorkspaceById = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await workspaceService.getWorkspaceById(req.params.workspaceId),
    message: "Workspace Fetched Successfully",
  });
};
