import { gql } from "apollo-server-express";

const user = gql`

  interface User{
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

 # This "patient" type defines the queryable fields for every patient in our data source.
 type Patient {
    uid: UUID!
    userUid: UUID!
    licence_no: String!
    experience: Int!
    rating: Int
    is_verified: Boolean
    about: String
    bio: String
  }


  union UserType

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
