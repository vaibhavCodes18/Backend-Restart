import { Router } from "express";

import authRouter from "./auth.route.js";
import workspaceRouter from "./workspace.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/workspace", workspaceRouter);

export default router;
