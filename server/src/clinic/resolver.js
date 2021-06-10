import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import enums from "../helpers/enums/enums.js";
import clinic from "./model.js";
import __ from "lodash";

const resolverMap = {
  Clinic: {
    address: async (clinic, arg, { loader }) => {
      if (__.isNull(clinic.addressUid)) {
        return null;
      }
      try {
        const response = await loader.address.load(clinic.addressUid);
        return __.first(response);
      } catch (error) {
        console.error(error);
      }
    },
    doctor: async (clinic, arg, { loader }) => {
      if (__.isNull(clinic.doctorUid)) {
        return null;
      }
      try {
        const response = await loader.doctor.load(clinic.doctorUid);
        console.log(response)
        return __.first(response);
      } catch (error) {
        console.error(error);
      }
    },
    schedule: (clinic, arg, { loader }) => {
      if (__.isNull(clinic.doctorClinicUid)) {
        return null;
      }
      try {
        return loader.schedule.load(clinic.doctorClinicUid);
      } catch (error) {
        console.error(error);
      }
    },
    appointment: (clinic, arg, { loader }, info) => {
      if (__.isNull(clinic.doctorClinicUid)) {
        return null;
      }
      try {
        const response = loader.appointment.load(clinic.doctorClinicUid);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },

  Query: {
    getClinic: (obj, clinicData) => clinic.get(clinicData),
    getAllClinic: clinic.getAll,
  },
  Mutation: {
    upsertClinic: async (obj, clinicData, { user, loader }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (user.role === enums.role.PATIENT) {
        throw new ForbiddenError("Not authorize to create or update clinic");
      }

      try {
        const response = await clinic.upsert({
          doctorUid: user.uid,
          ...clinicData,
        });

        loader?.clinic?.clear(user.uid);
        loader?.address?.clear(clinicData.address.uid);

        return response;
      } catch (error) {
        console.error(error);
      }
    },
    createClinic: async (obj, clinicData, { user, loader }) => {
      console.log("USER", user);
      
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (user.role === enums.role.PATIENT) {
        throw new ForbiddenError("Not authorize to create clinic");
      }

      try {
        const response = await clinic.create({
          doctorUid: user.uid,
          ...clinicData,
        });
        loader?.clinic?.clear(user.uid);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    updateClinic: async (obj, clinicData, { user, loader }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (user.role === enums.role.PATIENT) {
        throw new ForbiddenError("Not authorize to update clinic");
      }

      try {
        const response = await clinic.update(clinicData);
        loader?.clinic?.clear(user.uid);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    deleteClinic: async (obj, clinicData, { user, loader }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (user.role === enums.role.PATIENT) {
        throw new ForbiddenError("Not authorize to delete clinic");
      }

      try {
        const response = await clinic.remove(clinicData.uid);
        loader?.clinic?.clear(user.uid);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
  // Subscription: {},
};

export default resolverMap;
