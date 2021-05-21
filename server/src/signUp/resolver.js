import { ForbiddenError } from "apollo-server-errors";
import enums from "../helpers/enums/enums.js";
import signUp from "./signUp.js";
import jwt from "jsonwebtoken";
import __ from "lodash";
import { generateJWT } from "../helpers/generateJWT.js";

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
      const jwtToken = generateJWT(result);
      
      return jwtToken;
    },
  },
};
