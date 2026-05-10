import { Router } from "express";

import authRouter from "./auth.route.js";
import workspaceRouter from "./workspace.route.js";
import projectRouter from "./project.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/workspaces", workspaceRouter);
router.use("/projects", projectRouter);

export default router;
