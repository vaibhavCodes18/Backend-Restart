import { Router } from "express";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as orderController from "../controllers/order.controller.js";

const router = Router();

router.post("/", authMiddleware.verifyJwt, orderController.addOrder);

router.get("/", authMiddleware.verifyJwt, orderController.getOrderHistory);

router.get("/:id", authMiddleware.verifyJwt, orderController.getOrderById);

export default router;