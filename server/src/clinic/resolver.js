import { AuthenticationError } from "apollo-server-express";
import clinic from "./model.js";
import __ from "lodash";

const resolverMap = {
  Clinic: {
    address: async (clinic, arg, { loader }) => {
      return loader.address.load(clinic.addressUid);
    },
    schedule: async (clinic, arg, { loader }) => {
      return loader.schedule.load(clinic.doctorClinicUid);
    },
    appointment: (clinic, arg, { loader }, info) => {
      return loader.appointment.load(clinic.doctorClinicUid);
    },
  },

  Query: {
    getClinic: (obj, clinicData) => clinic.get(clinicData),
    getAllClinic: (obj, clinicData) => clinic.getAll(),
  },
  Mutation: {
    upsertClinic: (obj, clinicData, context) => {
      if (__.isEmpty(context.user)) {
        throw new AuthenticationError("No authorization header found");
      }

      return clinic.upsert({ doctorUid: context.user.uid, ...clinicData });
    },
    createClinic: (obj, clinicData, context) => {
      if (__.isEmpty(context.user)) {
        throw new AuthenticationError("No authorization header found");
      }

      return clinic.create({ doctorUid: context.user.uid, ...clinicData });
    },
    updateClinic: (obj, clinicData) => clinic.update(clinicData),
    deleteClinic: (obj, clinicData) => clinic.remove(clinicData.uid),
  },
  // Subscription: {},
};

export default resolverMap;
