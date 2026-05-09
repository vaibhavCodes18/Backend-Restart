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

export const inviteMemberToWorkspace = async (req, res) => {
  return res.status(201).json({
    success: true,
    data: await workspaceService.addMembersToWorkspace(req.body, req.params.workspaceId),
    message: "Member Invited Successfully",
  });
};
export const getAllWorkspaceMembers = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await workspaceService.getWorkspaceMembers(req.user.id, req.params.workspaceId),
    message: "Workspace Members Fetched Successfully",
  });
};

export const changeMemberRole = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await workspaceService.changeMemberRole(req.params.memberId, req.params.workspaceId, req.body.role),
    message: "Member Role Changed Successfully",
  });
};

export const deleteMemberFromWorkspace = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: await workspaceService.deleteMemberFromWorkspace(req.params.memberId, req.params.workspaceId),
    message: "Member Deleted Successfully",
  });
};
