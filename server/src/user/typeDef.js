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
  }

  extend type Query {
    getUser: User!
    getAllUser: [User!]
  }

  extend type Mutation {
    updateUser(
      uid: UUID!
      firstName: String
      middleName: String
      lastName: String
      password: String
      sex: Sex
      birthdate: Date
      address: AddressInput
      img: String
      role: Role
    ): User!

    deleteUser(uid: UUID!): User!
  }
`;

export default user;
