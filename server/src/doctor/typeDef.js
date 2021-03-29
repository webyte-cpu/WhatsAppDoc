import { gql } from "apollo-server-core";
const doctor = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "doctor" type defines the queryable fields for every doctor in our data source.
  type Doctor {
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
  # case, the "doctor" query returns an array of zero or more doctor (defined above).

  extend type Query {
    doctor: [Doctor]
  }

  extend type Mutation {
    createDoctor(
        userUid: UUID!
        licence_no: String!
        experience: Int!
        rating: Int
        is_verified: Boolean
        about: String
        bio: String
    ): Doctor
  }

  # type Subcription {

  # }
`;

export default doctor;
