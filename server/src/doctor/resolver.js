import doctor from "./doctor.js";
const resolverMap = {
  Query: {
    getDoctor: (obj, arg) => {
      return doctor.get(arg.uid);
    },

    getAllDoctor: async (obj, arg) => {
      return doctor.getAll({})
    }
  },
  Mutation: {
    createDoctor: (obj, arg) => {
      console.log(arg);
      //link to doctor in the database
      return doctor.create(arg);
    },
    updateDoctor: (obj, arg) => {
      console.log(arg);
      //link to doctor in the database
      return doctor.update(arg);
    },
    deleteDoctor: (obj, arg) => {
      console.log(arg);
      //link to doctor in the database
      return doctor.remove(arg.uid);
    },
  },
  // Subscription: {},
};

export default resolverMap;
