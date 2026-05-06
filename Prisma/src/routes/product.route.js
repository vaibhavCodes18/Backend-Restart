import express from 'express'
import { createProduct, getProducts } from '../controllers/product.controller.js';
const router = express.Router();

router.post("/create", createProduct);
router.get("/all-products", getProducts);

export default router