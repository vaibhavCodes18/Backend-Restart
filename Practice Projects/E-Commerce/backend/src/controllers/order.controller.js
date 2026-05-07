import * as orderService from "../services/order.service.js";

export const addOrder = async (req, res) => {
    return res.status(201).json(await orderService.placeOrder(req.user.id, req.body));
}

export const getOrders = async (req, res) => {
    return res.status(200).json(await orderService.getOrders(req.user.id));
}

export const getOrderHistory = async (req, res) => {
    return res.status(200).json(await orderService.getOrderHistoryByUserId(req.user.id));
}

export const getOrderById = async (req, res) => {
    return res.status(200).json(await orderService.getOrderById(req.params.id));
}