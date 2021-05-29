import doctor from "./model.js";
import address from "../address/model.js";
import appointment from "../appointment/model.js";
import clinic from "../clinic/model.js";
import specialization from "../specialization/model.js";
import enums from "../helpers/enums/enums.js";
import __ from "lodash";

export default {
  Doctor: {
    specialization: (doctor) => specialization.assignedTo(doctor.uid),
    address: async (doctor, arg, { loader }) => {
      return loader.address.load(doctor.addressUid);
    },
    clinic: async (doctor, arg, { loader }) => {
      return loader.clinic.load(doctor.uid);
    },
  },

  Query: {
    getDoctor: async (obj, arg, { user }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }
      return __.first(await doctor.get(user.uid));
    },
    getAllDoctor: (obj, arg) => {
      return doctor.get();
    },
  },
  Mutation: {
    createDoctor: (obj, arg, { user }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (user == enums.role.ADMIN) {
        return doctor.create(arg);
      }

      throw new AuthenticationError("Not authorize to create doctor");
    },
    updateDoctor: (obj, doctorData, { user }) => {
      if (__.isEmpty(context.user)) {
        throw new AuthenticationError("No authorization header found");
      }
      return doctor.update(user.uid, doctorData);
    },
    deleteDoctor: (obj, arg, { user }) => {
      if (__.isEmpty(context.user)) {
        throw new AuthenticationError("No authorization header found");
      }
      return doctor.remove(user.uid);
    },
  },
  // Subscription: {},
};
