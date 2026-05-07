import * as productService from "../services/product.service.js";

export const addProduct = async (req, res) => {
  return res.status(201).json(await productService.addProduct(req.body));
};

export const getAllProducts = async (req, res) => {
  return res.status(200).json(await productService.getAllProducts());
}

export const getProductById = async (req, res) => {
  return res.status(200).json(await productService.getProductById(req.params.id));
}

export const deleteProduct = async (req, res) => {
  return res.status(200).json(await productService.deleteProduct(req.params.id));
}

export const updateProduct = async (req, res) => {
  return res.status(200).json(await productService.updateProduct(req.params.id, req.body));
}