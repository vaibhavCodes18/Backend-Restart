import * as userService from "../services/user.service.js";

export const getProfile = async (req, res) => {
    return res.status(200).json(await userService.getProfile(req.user.id));
}

export const addAdmin = async (req, res) => {
    return res.status(201).json(await userService.addAdmin(req.body));
}