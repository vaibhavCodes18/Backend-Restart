import * as userService from "../services/user.service.js";

export const createdUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  console.log(user);
  
  res.json(user);
}

export const getUsers = async (req, res) => {
  const user = await userService.getUsers();
  console.log(user);
  res.json(user);
}