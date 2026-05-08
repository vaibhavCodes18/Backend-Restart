import * as jwt from "../utils/jwt.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = await jwt.verifyAccessToken(token);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
