import enums from "../helpers/enums/enums.js";
import doctor from "./model.js";
import __ from "lodash";
import { ForbiddenError } from "apollo-server-errors";

export default {
  Doctor: {
    specialization: async (doctor, arg, { loader }) => {
      if (__.isNull(doctor.uid)) {
        return null;
      }
      try {
        const response = await loader.specialization.load(doctor.uid);
        return response.map((specialization) => specialization.title);
      } catch (error) {
        console.error(error);
      }
    },
    address: async (doctor, arg, { loader }) => {
      if (__.isNull(doctor.addressUid)) {
        return null;
      }
      try {
        const response = await loader.address.load(doctor.addressUid);
        return __.first(response);
      } catch (error) {
        console.error(error);
      }
    },
    clinic: (doctor, arg, { loader }) => {
      if (__.isNull(doctor.uid)) {
        return null;
      }
      try {
        return loader.clinic.load(doctor.uid);
      } catch (error) {
        console.error(error);
      }
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

      if (![enums.role.ADMIN].includes(user.role)) {
        throw new ForbiddenError("Not authorize to create doctor");
      }

      try {
        return doctor.create(arg);
      } catch (error) {
        console.error(error);
      }
    },
    updateDoctor: (obj, doctorData, { user }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (![enums.role.ADMIN, enums.role.DOCTOR].includes(user.role)) {
        throw new ForbiddenError("Not authorize to update doctor");
      }

      try {
        return doctor.update(user.uid, doctorData);
      } catch (error) {
        console.error(error);
      }
    },
    deleteDoctor: (obj, arg, { user }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (![enums.role.ADMIN, enums.role.DOCTOR].includes(user.role)) {
        throw new ForbiddenError("Not authorize to delete doctor");
      }

      try {
        return doctor.remove(user.uid);
      } catch (error) {
        console.error(error);
      }
    },
  },
  // Subscription: {},
};
