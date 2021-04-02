import data from "../../db/sampleData.js";

const resolverMap = {
  User: {
    __resolveType(obj, context, info) {
      if (obj.licence_no) {
        return "Doctor";
      }

      if (obj.patientStatus) {
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


};

export default resolverMap;
