import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/roles.middleware.js";
import { WorkspaceRole } from "@prisma/client";

const router = Router({ mergeParams: true });

router.post(
  "/",
  authUser,
  allowRoles("ADMIN", "OWNER"),
  projectController.createProject
);

router.get(
  "/",
  authUser,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  projectController.getAllProjectsInsideWorkspace,
);

router.get(
  "/:projectId",
  authUser,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  projectController.getProjectDetail
);

router.put(
  "/:projectId",
  authUser,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN),
  projectController.updateProject,
);

router.delete(
  "/:projectId",
  authUser,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN),
  projectController.deleteProject,
);


export default router;
