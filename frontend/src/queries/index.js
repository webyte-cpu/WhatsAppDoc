import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  subscription {
    newNotification {
      title
      description
      isSeen
      isArchived
      createdAt
    }
  }
`;
