import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import check from "./check.js";
import __ from "lodash";

export default {
  Query: {
    viewer: (parent, arg, context) => {
      if (__.isEmpty(context.user)) {
        throw new AuthenticationError("No authorization header found");
      }
      return context.user;
    },
  },
  Mutation: {
    signIn: async (obj, { email, password }) => {
      const result = await check({ email, password });

      const payload = {
        uid: result.uid,
        role: result.role,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        verificationStatus: result.verificationStatus,
      };
      return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "1d",
      });
    },
  },
};
