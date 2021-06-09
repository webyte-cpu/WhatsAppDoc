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
        const response = await loader.clinic
          .groupBy("doctorClinicUid")
          .load(appointment.doctorClinicUid);

        return __.first(response);
      } catch (error) {
        console.error(error);
      }
    },

    patient: async (appointment, arg, { loader }) => {
      if (__.isNull(appointment.patientUid)) {
        return null;
      }
      try {
        const response = await loader.patient.load(appointment.patientUid);
        return __.first(response);
      } catch (error) {
        console.error(error);
      }
    },
  },

  Query: {
    getAppointment: (obj, arg, { user }) => appointment.get(user.uid),
    getAllAppointment: (obj, arg) => appointment.getAll(),
  },

  Mutation: {
    createAppointment: async (obj, arg, { pubsub, user }) => {
      if (user.role !== enums.role.PATIENT) {
        throw new ApolloError("Not authorize to create an appointment!");
      }

      const response = await appointment.create({
        ...arg,
        patientUid: user.uid,
      });

      pubsub.publish(`APPOINTMENT_${arg.doctorClinicUid}`, {
        newAppointment: await appointment.get(user.uid),
      });
      console.log("published");
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

  Subscription: {
    newAppointment: {
      subscribe: (_, { doctorClinicUids }, { pubsub, user }) => {

        console.log(`subscribed to appointment @${uid}`);
        const triggers = doctorClinicUids.map((uid) => "APPOINTMENT" + "_" + uid);
        setTimeout(
          async () =>
            pubsub.publish("APPOINTMENT_" + uid, {
              newAppointment: await appointment.get(user.uid),
            }),
          0
        );
        return pubsub.asyncIterator(triggers);
      },
    },
  },
};
