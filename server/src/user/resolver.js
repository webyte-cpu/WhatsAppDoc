import { AuthenticationError } from "apollo-server-express";
import enums from "../helpers/enums/enums.js";
import user from "./model.js";
import __ from "lodash";

export default {
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
      return __.first(await user.get(context.user.uid));
    },
    getAllUser: () => user.get(),
  },

  Mutation: {
    updateUser: (obj, arg) => user.update(arg),
    deleteUser: (obj, arg) => user.remove(arg),
  },
};
