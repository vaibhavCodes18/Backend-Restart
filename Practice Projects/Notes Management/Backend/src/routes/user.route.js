import * as userController from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router()

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

export default router;