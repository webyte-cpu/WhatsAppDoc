import { AuthenticationError, ForbiddenError } from "apollo-server-errors";
import * as notification from "../notification/model.js";
import __ from "lodash";

export default {
  Query: {
    getNotification: async (obj, arg, { user }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }
      const response = await notification.get(user.uid);
      return response;
    },
  },
  Mutation: {
    notify: async (obj, arg, { user, pubsub }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      try {
        const response = await notification.create(arg);
        pubsub.publish("NOTIFICATION_" + arg.userUid, {
          newNotification: await notification.get(arg.userUid),
        });
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    updateNotificationStatus: async (obj, arg, { user, pubsub }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }
      try {
        const response = await notification.update(arg.uid, arg);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    archiveNotifications: async (obj, arg, { user, pubsub }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }
      try {
        const response = await notification.archiveAll(arg);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
  Subscription: {
    newNotification: {
      subscribe: (_, { userUid }, { pubsub, user }) => {
        const uid = userUid || user.uid;
        console.log(`subscribe to notification @${uid}`);
        const subscriptions = ["NOTIFICATION"];
        const triggers = subscriptions.map(
          (subscription) => subscription + "_" + uid
        );
        setTimeout(
          async () =>
            pubsub.publish("NOTIFICATION_" + uid, {
              newNotification: await notification.get(uid),
            }),
          0
        );
        return pubsub.asyncIterator(triggers);
      },
    },
  },
};
