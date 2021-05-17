import { ForbiddenError } from "apollo-server-errors";
import enums from "../helpers/enums/enums.js";
import signUp from "./signUp.js";
import jwt from "jsonwebtoken";
import __ from "lodash";

export default {
  Mutation: {
    signUp: async (obj, arg, context) => {
      if (
        arg?.role === enums.role.ADMIN &&
        context?.user?.role !== enums.role.ADMIN
      ) {
        throw new ForbiddenError("Not authorize to signUp an admin");
      }

      const result = await signUp(arg);
      const payload = { uid: result.uid, role: result.role };
      return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "1d",
      });
    },
  },
};
