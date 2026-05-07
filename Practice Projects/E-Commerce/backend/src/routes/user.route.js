import { Router } from "express";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as userController from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", authMiddleware.verifyJwt, userController.getProfile);
router.post("/add-admin", userController.addAdmin);

export default router;