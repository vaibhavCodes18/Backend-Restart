import { Router } from "express";

import authRouter from "./auth.route.js";
import workspaceRouter from "./workspace.route.js";
import projectRouter from "./project.route.js";
import taskRouter from "./task.route.js";
import notificationRouter from "./notification.route.js";

const router = Router();
// Auth routes
router.use("/auth", authRouter);

// Workspace routes
router.use("/workspaces", workspaceRouter);

// project routes
router.use("/workspaces/:workspaceId/projects", projectRouter);

// Tasks routes
router.use("/projects/:projectId/tasks", taskRouter);
router.use("/tasks", taskRouter);

// Notification routes
router.use("/notifications", notificationRouter);

export default router;
