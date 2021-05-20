import { AuthenticationError } from "apollo-server-express";
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
    upsertClinic: (obj, clinicData, context) => {
      if (__.isEmpty(context.user)) {
        throw new AuthenticationError("No authorization header found");
      }
      
      return clinic.upsert({doctorUid: context.user.uid, ...clinicData})
    },
    createClinic: (obj, clinicData, context) => {
      if (__.isEmpty(context.user)) {
        throw new AuthenticationError("No authorization header found");
      }
      
      return clinic.create({doctorUid: context.user.uid, ...clinicData})
    },
    updateClinic: (obj, clinicData) => clinic.update(clinicData),
    deleteClinic: (obj, clinicData) => clinic.remove(clinicData.uid),
  },
  // Subscription: {},
};

export default resolverMap;
