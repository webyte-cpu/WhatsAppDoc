import { ForbiddenError } from "apollo-server-errors";
import enums from "../helpers/enums/enums.js";
import jwt from "jsonwebtoken";
import user from "./user.js";
import __ from "lodash";
import { AuthenticationError } from "apollo-server-express";

const resolverMap = {
  User: {
    __resolveType(obj) {
      switch (obj.role) {
        case enums.role.ADMIN:
          return "Admin";
        case enums.role.DOCTOR:
          return "Doctor";
        case enums.role.PATIENT:
          return "Patient";
        default:
          return null;
      }
    },
  },

  Query: {
    getUser: async (obj, arg, context) => {
      if (__.isEmpty(context.user)) {
        throw new AuthenticationError("No authorization header found");
      }
      return __.first(await user().get(context.user.uid));
    },
    getAllUser: () => user().get(),
    viewer: (parent, arg, context) => {
      if (__.isEmpty(context.user)) {
        throw new AuthenticationError("No authorization header found");
      }
      return context.user;
    },
  },

  Mutation: {
    signUp: async (obj, arg) => {
      if (arg?.role === enums.role.ADMIN && user?.role !== enums.role.ADMIN) {
        throw new ForbiddenError("Not authorize to signUp an admin");
      }

      const result = await user().signUp(arg);
      const payload = { uid: result.uid, role: result.role };
      return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "1d",
      });
    },
    signIn: async (obj, { email, password }) => {
      console.log(email, password);
      const result = await user().check({ email, password });
      const payload = {
        uid: result.uid,
        role: result.role,
        verificationStatus: result.verificationStatus,
      };
      return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "1d",
      });
    },
    updateUser: (obj, arg) => {
      return user().update(arg);
    },
    deleteUser: (obj, arg) => {
      return user().delete(arg);
    },
  },
};

export default resolverMap;
