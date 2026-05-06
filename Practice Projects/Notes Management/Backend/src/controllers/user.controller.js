import * as userService from "../services/user.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async(req, res) => {
    try {
        const userRes = await userService.loginUser(req.body);
        res.cookie("refreshToken",userRes.refreshToken,{
            httpOnly:true, 
            secure:true, 
            sameSite:"strict",
            maxAge:1000 * 60 * 60 * 24 * 7
        })
        res.status(200).json(userRes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
