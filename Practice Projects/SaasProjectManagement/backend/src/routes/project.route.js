import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/roles.middleware.js";

const router = Router();

router.post(
  "/",
  authUser,
  allowRoles("ADMIN", "OWNER"),
  projectController.createProject
);

export default router;
