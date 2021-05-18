import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    viewer: User
  }

  extend type Mutation {
    signIn(email: EmailAddress!, password: String!): JWT!
  }
`;
