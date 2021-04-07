import { gql } from "apollo-server-express";

const user = gql`
  interface User {
    uid: UUID!
    firstName: String!
    MiddleName: String
    lastName: String!
    email: EmailAddress!
    password: String!
    role: Role!
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type Query {
    getUser(uid: UUID!): [User]
    getAllUser: [User]
  }

  extend type Mutation {
    signUp(
      firstName: String!
      MiddleName: String
      lastName: String!
      email: EmailAddress!
      password: String!
      role: Role!
      createdAt: DateTime
      updatedAt: DateTime
    ): User
  }
`;

export default user;
