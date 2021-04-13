import { gql } from "apollo-server-core";
const patient = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "patient" query returns an array of zero or more patient (defined above).

  extend type Query {
    patient: [Patient]
  }

  extend type Mutation {
    createPatient(
        userUid: UUID!
        licence_no: String!
        experience: Int!
        rating: Int
        is_verified: Boolean
        about: String
        bio: String
    ): Patient
  }

  # type Subcription {

  # }
`;

export default patient;