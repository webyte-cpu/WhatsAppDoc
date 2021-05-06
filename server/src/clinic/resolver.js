import address from "../address/address.js";
import clinic from "./clinic.js";
import __ from "lodash";

const resolverMap = {
  Clinic: {
    address: async (obj) => __.first(await address().get(obj.addressUid)),
  },

  Query: {
    getClinic: (obj, arg) => clinic().get(arg),
  },
  Mutation: {
    createClinic: (obj, arg) => clinic().create(arg),
    updateClinic: (obj, arg) => clinic().update(arg),
    deleteClinic: (obj, arg) => clinic().remove(arg),
  },
  // Subscription: {},
};

export default resolverMap;
