import address from "../address/model.js";
import clinic from "./model.js";
import __ from "lodash";

const resolverMap = {
  Clinic: {
    address: async (obj) => __.first(await address.get(obj.addressUid)),
  },

  Query: {
    getClinic: (obj, clinicData) => clinic.get(clinicData),
  },
  Mutation: {
    createClinic: (obj, clinicData) => clinic.create(clinicData),
    updateClinic: (obj, clinicData) => clinic.update(clinicData),
    deleteClinic: (obj, clinicData) => clinic.remove(clinicData.uid),
  },
  // Subscription: {},
};

export default resolverMap;
