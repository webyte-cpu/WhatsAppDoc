import { ForbiddenError } from "apollo-server-errors";
import enums from "../helpers/enums/enums.js";
import jwt from "jsonwebtoken";
import user from "./user.js";
import __ from "lodash";

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
    getUser: (obj, arg) => user().get(arg.uid),
    getAllUser: () => user().get(),
    viewer: (parent, arg, context) => {
      //for checking if

      console.log(context);
      if (__.isEmpty(context.user)) {
        return null;
      }
      const { uid } = context.user;
      return context.user
    },
  },

  Mutation: {
    signUp: async (obj, arg, context) => {
      if (arg?.role === "ADMIN" && user?.role !== "ADMIN") {
        throw new ForbiddenError("Not authorize to signUp an admin");
      }

      const payload = await user().signUp(arg);
      return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS256",
        subject: payload.uid,
        expiresIn: "1d",
      });
    },
    signIn: async (obj, { email, password }) => {
      const payload = await user().check({ email, password });
      return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS256",
        subject: payload.uid,
        expiresIn: "1d",
      });
    },
    updateUser: (obj, arg) => {
      return user().update(arg);
    },
    deleteUser: (obj, arg) => {
      return user().delete(arg);
    }
  },
};

export default resolverMap;
