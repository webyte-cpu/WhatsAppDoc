import data from "../../db/sampleData.js";
import user from "./user.js";

const resolverMap = {
  User: {
    __resolveType(obj, context, info) {
      if (obj.licenceNo && obj.isDoctor) {
        return "Doctor";
      }

      if (obj.patientStatus || !obj.isDoctor) {
        return "Patient";
      }

      return null;
    },
  },

  Query: {
    getUser: (obj, arg) => {
      return data.user.filter((user) => user.uid === arg.uid);
    },
    getAllUser: (obj, arg) => {
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
