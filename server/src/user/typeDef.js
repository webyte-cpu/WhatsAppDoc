import { gql } from "apollo-server-express";

const user = gql`
  interface User {
    uid: UUID!
    firstName: String!
    middleName: String
    lastName: String!
    email: EmailAddress!
    password: String!
    birthdate: Date!
    sex: Sex
    address: Address
    role: Role!
    img: String
    createdAt: DateTime
    updatedAt: DateTime
    pushToken: String
  }

  type Admin implements User {
    uid: UUID!
    firstName: String!
    middleName: String
    lastName: String!
    email: EmailAddress!
    password: String!
    birthdate: Date!
    sex: Sex
    address: Address
    role: Role!
    img: String
    createdAt: DateTime
    updatedAt: DateTime
    pushToken: String
  }

  extend type Query {
    getUser: User!
    getAllUser: [User!]
  }

  extend type Mutation {
    updateUser(
      firstName: String
      middleName: String
      lastName: String
      password: String
      sex: Sex
      birthdate: Date
      address: AddressInput
      img: String
      role: Role
      pushToken: String
    ): User!

    deleteUser(uid: UUID!): User!
  }
`;

export default user;
