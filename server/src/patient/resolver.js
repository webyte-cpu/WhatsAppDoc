import patient from "./model.js";
import __ from "lodash";

const resolverMap = {
  Patient: {
    address: async (patient, arg, { loader }) => {
      if (__.isNull(patient.addressUid)) {
        return null;
      }
      try {
        const response = await loader.address.load(patient.addressUid);
        return __.first(response);
      } catch (error) {
        console.error(error);
      }
    },
    appointment: async (patient, arg, { loader }) => {
      if (__.isNull(patient.patientUid)) {
        return null;
      }
      try {
        return loader.appointment.groupBy("patientUid").load(patient.uid);
      } catch (error) {
        console.error(error);
      }
    },
  },
  Query: {
    getPatient: (obj, arg) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }
      return patient.get(arg.uid);
    },
    getAllPatients: (obj, arg) => patient.getAll(),
  },
  Mutation: {
    createPatient: (obj, arg, { user }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (![enums.role.ADMIN].includes(user.role)) {
        throw new ForbiddenError("Not authorize to create doctor");
      }

      try {
        const response = patient.create(arg);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    updatePatient: (obj, doctorData, { user }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (![enums.role.ADMIN, enums.role.DOCTOR].includes(user.role)) {
        throw new ForbiddenError("Not authorize to update doctor");
      }
      try {
        const response = patient.update(arg);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    deletePatient: (obj, doctorData, { user }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (![enums.role.ADMIN, enums.role.DOCTOR].includes(user.role)) {
        throw new ForbiddenError("Not authorize to delete doctor");
      }
      try {
        const response = patient.remove(arg.uid);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
  //Subscription: {},
};

export default resolverMap;
