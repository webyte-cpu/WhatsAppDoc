import doctor from "./doctor.js";
import specialization from "../specialization/specialization.js";

const resolverMap = {
  Doctor: {
    specialization: (doctor) => specialization().assignedTo(doctor.uid),
  },

  Query: {
    getDoctor: (obj, arg) => {
      return doctor().get(arg.uid);
    },
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
