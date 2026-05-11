import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/roles.middleware.js";
import { WorkspaceRole } from "@prisma/client";
import { taskAccess } from "../middlewares/task.middleware.js";
import { projectAccess } from "../middlewares/project.middleware.js";

const router = Router({ mergeParams: true });

router.post(
  "/",
  authUser,
  projectAccess,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  taskController.createTask,
);

router.get(
  "/",
  authUser,
  projectAccess,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  taskController.getAllTasksInsideProject,
);

router.get(
  "/:taskId",
  authUser,
  taskAccess,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  taskController.getTaskById,
);

export default router;
