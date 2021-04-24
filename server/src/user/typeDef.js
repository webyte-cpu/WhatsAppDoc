import { gql } from "apollo-server-express";

const user = gql`
  interface User {
    uid: UUID!
    firstName: String!
    middleName: String
    lastName: String!
    email: EmailAddress!
    password: Password!
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
    password: Password!
    birthdate: Date!
    sex: Sex
    address: Address
    role: Role!
    img: String
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
      middleName: String
      lastName: String!
      email: EmailAddress!
      password: Password!
      role: Role!
      img: String
      sex: Sex!
      birthdate: Date!
      doctor: DoctorInput
    ): JWT!

    updateUser(
      uid: UUID!
      firstName: String
      middleName: String
      lastName: String
      password: Password
      sex: Sex
      birthdate: Date
      address: AddressInput
      img: String
      role: Role
    ): User!

    deleteUser(uid: UUID!): User!

    signIn(email: EmailAddress!, password: Password!): JWT!
  }
`;

export default user;
