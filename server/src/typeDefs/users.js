import { gql } from "apollo-server-express";

const user = gql`

  type User{
      uid:UUID!
      addressUid: UUID
      firstName: String
      lastName: String
      email: String!
      password: String!
      sex: String
      birthdate: String
      phoneNumber: String
      weight: String
      height: String
      civilStatus: String
      nationality: String
      isDoctor: Boolean
  }


  extend type Query {
    user: [User!]
  }

  extend type Mutation {
     createUser(
       addressUid: UUID
       firstName: String
       lastName: String
       email: String!
       password: String!
       sex: String
       birthdate: String
       phoneNumber: String
       weight: String
       height: String
       civilStatus: String
       nationality: String
       isDoctor: Boolean): Admin
  }

  # type Subcription {

  # }


`;

export default user;
