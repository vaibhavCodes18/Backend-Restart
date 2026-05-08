import { Router } from "express";
import * as workspaceController from "../controllers/workspace.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authUser, workspaceController.createWorkspace);

router.get("/", authUser, workspaceController.getMyWorkspaces);

router.get("/:workspaceId", authUser, workspaceController.getWorkspaceById);

export default router;
