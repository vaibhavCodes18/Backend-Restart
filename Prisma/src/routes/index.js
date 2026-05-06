import express from "express";
import userRouters from "./user.route.js";
import productRouters from "./product.route.js";
import orderRouters from "./order.route.js";

const router = express.Router();

router.use("/user", userRouters);
router.use("/product", productRouters);
router.use("/order", orderRouters);

export default router;
