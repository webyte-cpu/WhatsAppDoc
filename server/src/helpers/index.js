import jwt from "jsonwebtoken";

export const validateToken = (rawToken) => {
  const token = rawToken.split(" ")[1];
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
