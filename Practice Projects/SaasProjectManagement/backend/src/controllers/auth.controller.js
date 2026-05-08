import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  return res.status(200).json(await authService.register(req.body));
};

export const login = async (req, res) => {
  const userRes = await authService.login(req.body);

  res.cookie("refreshToken", userRes.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  
  return res.status(200).json({
    accessToken: userRes.accessToken,
    user: userRes.user,
  });
};
