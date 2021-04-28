import patient from "./patient.js";
import __ from "lodash";

const resolverMap = {
  Query: {
    getPatient: async (obj, arg) => __.first(await patient().get(arg.uid)),
  },
  Mutation: {
    createPatient: (obj, arg) => {
      console.log(arg);
      //link to patient in the database
      return arg;
    },
    updatePatient: (obj, arg) => {
      console.log(arg);
      //link to patient in the database
      return arg;
    },
    deletePatient: (obj, arg) => {
      console.log(arg);
      //link to patient in the database
      return arg;
    },
  },
  //Subscription: {},
};

export default resolverMap;
