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

      pubsub.publish("NOTIFICATION_" + arg.userUid, {
        newNotification: arg,
      });
      const response = await notification.create(arg);
      return response;
    },
    updateNotificationStatus: async (obj, arg, { user, pubsub }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }
      const response = await notification.update(arg.uid, arg);
      return response;
    },
    archiveNotifications: async (obj, arg, { user, pubsub }) => {
      if (__.isEmpty(user)) {
        throw new AuthenticationError("No authorization header found");
      }

      const response = await notification.archiveAll(arg);
      return response;
    },
  },
  Subscription: {
    newNotification: {
      subscribe: (_, { userUid }, { pubsub, user }) => {
        console.log(`subscription notification @${userUid || user.uid}`);
        const subscriptions = ["NOTIFICATION"];
        const triggers = subscriptions.map(
          (subscription) => subscription + "_" + (userUid || user.uid)
        );
        return pubsub.asyncIterator(triggers);
      },
    },
  },
};
