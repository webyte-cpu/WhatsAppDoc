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

  type Admin implements User {
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
      address: AddressInput
      sex: Sex!
      birthdate: Date!
      licenceNum: String
      licenceImg: String
    ): User
  }
`;

export default user;
