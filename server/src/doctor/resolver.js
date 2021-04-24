import doctor from "./doctor.js";
const resolverMap = {
  Query: {
    getDoctor: (obj, arg) => {
      return doctor.get(arg.uid);
    },

    getAllDoctor: async (obj, arg) => {
      return doctor.get({})
    }
  },
  Mutation: {
    createDoctor: async (obj, arg) => {
      return await doctor().create(arg);
    },
    updateDoctor: async (obj, arg) => {
      return await doctor().update(arg);
    },
    deleteDoctor: async (obj, arg) => {
      const dbResponse = await doctor().remove(arg.uid);
      return dbResponse.uid;
    },
  },
  // Subscription: {},
};

export default resolverMap;
