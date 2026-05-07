import * as jwtUtil from "../utils/jwt.js";

export const verifyJwt = async (req, res, next) => {
    const token = req.cookies.accessToken || req.header("Authorization").replace("Bearer ", "");

    if(!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = await jwtUtil.verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}