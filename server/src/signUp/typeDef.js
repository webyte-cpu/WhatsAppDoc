import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    signUp(
      firstName: String!
      middleName: String
      lastName: String!
      email: EmailAddress!
      password: String!
      role: Role!
      img: String
      sex: Sex!
      birthdate: Date!
      doctor: DoctorInput
    ): JWT!
  }
`;
