import { ApolloError } from "apollo-server-errors";
import appointment from "../appointment/model.js";
import enums from "../helpers/enums/enums.js";
import __ from "lodash";

export default {

  Appointment: {
    clinic: async (appointment, arg, { loader }) => {
      if (__.isNull(appointment.doctorClinicUid)) {
        return null;
      }
      try {
        const response = await loader.clinic.groupBy("doctorClinicUid").load(appointment.doctorClinicUid);
  
        console.log(response)
      
        return __.first(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
  
  Query: {
    getAppointment: (obj, arg) => appointment.get(arg.uid),
    getAllAppointment: (obj, arg) => appointment.getAll(),
  },

  Mutation: {
    createAppointment: async (obj, arg, { user }) => {
      if (user.role !== enums.role.PATIENT) {
        throw new ApolloError("Not authorize to create an appointment!");
      }

      const response = await appointment.create({
        ...arg,
        patientUid: user.uid,
      });

      return response;
    },
    updateAppointment: async (obj, arg) => {
      const response = await appointment.update(arg);
      return response;
    },
    deleteAppointment: async (obj, arg, { user }) => {
      if (user.role !== enums.role.ADMIN) {
        throw new ApolloError("Not authorize to delete an appointment!");
      }
      const response = await appointment.remove(arg.uid);
      return response;
    },
  },
};
