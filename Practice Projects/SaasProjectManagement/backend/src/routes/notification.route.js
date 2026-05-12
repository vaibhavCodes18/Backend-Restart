import { Router } from "express";
import * as notificationController from "../controllers/notification.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authUser, notificationController.getNotification);

export default router;
