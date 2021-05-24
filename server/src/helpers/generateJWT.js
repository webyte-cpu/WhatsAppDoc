import enums from "./enums/enums.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const generateJWT = (data) => {
  const verificationStatus = data.role === enums.role.DOCTOR ? { verificationStatus: data.verificationStatus } : {}

  const payload = {
    uid: data.uid,
    role: data.role,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    ...verificationStatus, // for doctors only
  };  

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
}