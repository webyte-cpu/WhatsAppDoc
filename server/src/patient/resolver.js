import patient from "./model.js";
import __ from "lodash";

const resolverMap = {
  Query: {
    getPatient: (obj, arg) => patient.get(arg.uid),
  },
  Mutation: {
    createPatient: (obj, arg) => patient.create(arg),
    updatePatient: (obj, arg) => patient.update(arg),
    deletePatient: (obj, arg) => patient.remove(arg.uid),
  },
  //Subscription: {},
};

export default resolverMap;
