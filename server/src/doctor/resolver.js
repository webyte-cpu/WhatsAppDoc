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
    updateDoctor: async (obj, doctorData, { user, loader }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (![enums.role.ADMIN, enums.role.DOCTOR].includes(user.role)) {
        throw new ForbiddenError("Not authorize to update doctor");
      }

      try {
        const response = await doctor.update(user.uid, doctorData);

        if (!__.isUndefined(doctorData.specialization)) {
          loader.specialization.clear(user.uid);
        }

        return response;
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
    doctorVerification: async (
      obj,
      { doctorUid, status, message },
      { user, pubsub }
    ) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      if (![enums.role.ADMIN].includes(user.role)) {
        throw new ForbiddenError("Not authorize to verify doctor");
      }

      try {
        const { verificationStatus } = await doctor.update(doctorUid, {
          verificationStatus: status,
        });

        if (__.isUndefined(message)) {
          switch (status) {
            case enums.verificationStatus.PENDING:
              message =
                "Your account is currently undergoing verification. This process will take approximately 24 hours.";
              break;
            case enums.verificationStatus.VERIFIED:
              message =
                "Your account has been verified and is now available for appointments.";
              break;
            case enums.verificationStatus.DECLINED:
              message =
                "Sadly, the verification has been refused for some reason.";
              break;
          }
        }

        const payload = { status: verificationStatus, message };

        pubsub.publish("VERIFICATION_" + doctorUid, {
          doctorVerification: payload,
        });

        return payload;
      } catch (error) {
        console.error(error);
      }
    },
  },
  Subscription: {
    doctorVerification: {
      subscribe: (obj, { uid }, { pubsub }) =>
        pubsub.asyncIterator("VERIFICATION_" + uid),
    },
  },
};
