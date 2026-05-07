import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const generateAccessToken = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
}

export const generateRefreshToken = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const verifyAccessToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET);
}

export const verifyRefreshToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET);
}