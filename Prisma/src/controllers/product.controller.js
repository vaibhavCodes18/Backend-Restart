import * as productService from "../services/product.service.js";

export const createProduct = async (req, res) => {
  const product = await productService.saveProduct(req.body);
  console.log(product);

  res.json(product);
};
export const getProducts = async (req, res) => {
  const product = await productService.getProducts();
  console.log(product);
  res.json(product);
};
