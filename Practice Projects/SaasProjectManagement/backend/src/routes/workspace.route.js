import { Router } from "express";
import * as workspaceController from "../controllers/workspace.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/roles.middleware.js";
import { WorkspaceRole } from "@prisma/client";
import { workspaceAccess } from "../middlewares/workspace.middleware.js";

const router = Router();

router.post("/", authUser, workspaceController.createWorkspace);

router.get("/", authUser, workspaceController.getMyWorkspaces);

router.get("/:workspaceId", authUser, workspaceController.getWorkspaceById);

router.post(
  "/:workspaceId/members",
  authUser,
  workspaceAccess,
  allowRoles(WorkspaceRole.ADMIN, WorkspaceRole.OWNER),
  workspaceController.inviteMemberToWorkspace,
);
router.get(
  "/:workspaceId/members",
  authUser,
  workspaceAccess,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  workspaceController.getAllWorkspaceMembers,
);
router.patch(
  "/:workspaceId/members/:memberId/role",
  authUser,
  workspaceAccess,
  allowRoles(WorkspaceRole.OWNER),
  workspaceController.changeMemberRole,
);

router.delete(
  "/:workspaceId/members/:memberId",
  authUser,
  workspaceAccess,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN),
  workspaceController.deleteMemberFromWorkspace,
);



export default router;
