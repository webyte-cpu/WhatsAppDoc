import data from "../../db/sampleData.js";
import user from "./user.js";
import enums from "../helpers/enums/enums.js";

const resolverMap = {
  User: {
    __resolveType(obj, context, info) {
      console.log(obj.role);
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
    getUser: (obj, arg) => {
      const { uid, email } = obj;
      return user.get(uid, email);
    },
    getAllUser: async (obj, arg) => {
      return user.get();
    },
  },

  Mutation: {
    signUp: async (obj, arg) => {
      const signUpResponse = user.signUp(arg);
      console.log(await signUpResponse);
      return signUpResponse;
    },
  },
};

export default resolverMap;
