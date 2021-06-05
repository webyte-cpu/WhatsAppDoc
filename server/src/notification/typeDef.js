import { gql } from "apollo-server-express";

export default gql`
  type Notification {
    uid: UUID
    userUid: UUID
    title: String
    description: String
    createdAt: DateTime
    content: String
    type: Int
    sourceType: String
    isSeen: Boolean
    isArchived: Boolean
  }

  extend type Query {
    getNotification: [Notification]
  }

  extend type Mutation {
    notify(
      userUid: UUID!
      title: String!
      description: String!
      content: String
      type: Int
      sourceType: String
    ): Notification
    updateNotificationStatus(isSeen: Boolean, isArchived: Boolean): Notification
    archiveNotifications(uids: [UUID!]): Notification
  }

  extend type Subscription {
    newNotification(userUid: UUID): Notification
  }
`;
