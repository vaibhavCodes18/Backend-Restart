import * as orderService from '../services/order.service.js'

export const makeOrder = async (req, res) => {
  const order = await orderService.createOrder(req.body);
  console.log(order);
  
  res.json(order);
}

export const getOrder = async (req, res) => {
  const order = await orderService.getOrders();
  console.log(order);
  
  res.json(order);
}