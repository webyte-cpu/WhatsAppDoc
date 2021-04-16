import { gql } from "apollo-server-express";

const user = gql`
  interface User {
    uid: UUID!
    firstName: String!
    MiddleName: String
    lastName: String!
    email: EmailAddress!
    password: Password!
    role: Role!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Admin implements User {
    uid: UUID!
    firstName: String!
    MiddleName: String
    lastName: String!
    email: EmailAddress!
    password: Password!
    role: Role!
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type Query {
    getUser(uid: UUID!): User!
    getAllUser: [User!]
    viewer: User
  }

  extend type Mutation {
    signUp(
      firstName: String!
      MiddleName: String
      lastName: String!
      email: EmailAddress!
      password: Password!
      role: Role!
    ): UUID!

    updateUser(
      firstName: String!
      MiddleName: String
      lastName: String!
      password: Password!
      role: Role!
    ): User!

    deleteUser(
      firstName: String!
      MiddleName: String
      lastName: String!
      password: Password!
      role: Role!
    ): User!

    signIn(email: EmailAddress!, password: Password!): JWT!
  }
`;

export default user;
