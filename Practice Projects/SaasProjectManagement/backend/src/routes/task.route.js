import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/roles.middleware.js";
import { WorkspaceRole } from "@prisma/client";

const router = Router({ mergeParams: true });

router.post(
  "/",
  authUser,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  taskController.createTask,
);

router.get(
  "/",
  authUser,
  allowRoles(WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER),
  taskController.getAllTasksInsideProject,
);

export default router;
