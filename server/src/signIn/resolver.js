import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import check from "./check.js";
import __ from "lodash";
import { generateJWT } from "../helpers/generateJWT.js";

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

      const jwtToken = generateJWT(result);
      return jwtToken;
    },
  },
};
