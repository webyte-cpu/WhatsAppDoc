import { gql } from "apollo-server-express";

const user = gql`
  enum Sex {
    MALE
    FEMALE
  }

  interface User {
    uid: UUID!
    address: Address
    firstName: String
    lastName: String
    email: EmailAddress!
    password: String!
    sex: Sex
    birthdate: Date
    phoneNumber: String
    weight: PositiveFloat
    height: PositiveFloat
    civilStatus: String
    nationality: String
    isDoctor: Boolean
  }

  extend type Query {
    getUser(uid: UUID!): [User]
    getAllUser: [User]
  }
`;

export default user;
