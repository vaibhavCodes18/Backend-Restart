import { Router } from "express";
import * as workspaceController from "../controllers/workspace.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/roles.middleware.js";
import { WorkspaceRole } from "@prisma/client";

const router = Router();

router.post("/", authUser, workspaceController.createWorkspace);

router.get("/", authUser, workspaceController.getMyWorkspaces);

router.get("/:workspaceId", authUser, workspaceController.getWorkspaceById);

router.post(
  "/:workspaceId/members",
  authUser,
  allowRoles(WorkspaceRole.ADMIN, WorkspaceRole.OWNER),
  workspaceController.inviteMemberToWorkspace,
);
router.get(
  "/:workspaceId/members",
  authUser,
  workspaceController.getAllWorkspaceMembers,
);
router.patch(
  "/:workspaceId/members/:memberId/role",
  authUser,
  allowRoles(WorkspaceRole.OWNER),
  workspaceController.changeMemberRole,
);

router.delete(
  "/:workspaceId/members/:memberId",
  authUser,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN),
  workspaceController.deleteMemberFromWorkspace,
);

router.get(
  "/:workspaceId/projects",
  authUser,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  workspaceController.getAllProjectsInsideWorkspace,
);

export default router;
