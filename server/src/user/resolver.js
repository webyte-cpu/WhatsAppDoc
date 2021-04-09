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
      const { uid, sortBy, role } = obj;

      return data.user.filter((user) => user.uid === arg.uid);
    },
    getAllUser: (obj, arg) => {
      /// return is user is admin
      return data.user;
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
