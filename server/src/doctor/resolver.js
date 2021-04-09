import doctor from "./doctor.js";
const resolverMap = {
  Query: {
    getDoctor: (obj, arg) => {
      //get specific admin from the database
      console.log(arg);

      /* 
      if uuid doesnt exist get all data
      and check for auth
      */

      //replace with database data
      return doctor.get(arg);
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
