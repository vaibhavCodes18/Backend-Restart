import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import { Role } from "@prisma/client";

const router = Router();

router.post("/", authMiddleware.verifyJwt, allowRoles(Role.ADMIN), productController.addProduct);

router.get("/", productController.getAllProducts);

router.get("/:id", authMiddleware.verifyJwt, productController.getProductById);

router.delete("/:id", authMiddleware.verifyJwt, allowRoles(Role.ADMIN), productController.deleteProduct);

router.put("/:id", authMiddleware.verifyJwt, allowRoles(Role.ADMIN), productController.updateProduct);

export default router;
