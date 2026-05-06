import express from "express";
import { getOrder, makeOrder } from "../controllers/order.controller.js";
const router = express.Router();

router.post("/make-order", makeOrder);
router.get("/get-order", getOrder);

export default router;
