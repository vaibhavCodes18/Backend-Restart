import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/roles.middleware.js";
import { WorkspaceRole } from "@prisma/client";
import { workspaceAccess } from "../middlewares/workspace.middleware.js";

const router = Router({ mergeParams: true });

router.post(
  "/",
  authUser,
  workspaceAccess,
  allowRoles("ADMIN", "OWNER"),
  projectController.createProject
);

router.get(
  "/",
  authUser,
  workspaceAccess,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  projectController.getAllProjectsInsideWorkspace,
);

router.get(
  "/:projectId",
  authUser,
  workspaceAccess,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  projectController.getProjectDetail
);

router.put(
  "/:projectId",
  authUser,
  workspaceAccess,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN),
  projectController.updateProject,
);

router.delete(
  "/:projectId",
  authUser,
  workspaceAccess,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN),
  projectController.deleteProject,
);


export default router;
