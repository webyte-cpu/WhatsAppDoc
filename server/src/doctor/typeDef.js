import { gql } from "apollo-server-core";
const doctor = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "doctor" type defines the queryable fields for every doctor in our data source.
  type Doctor implements User {
    uid: UUID!
    firstName: String!
    MiddleName: String
    lastName: String!
    email: EmailAddress!
    password: Password!
    role: Role!
    createdAt: DateTime
    updatedAt: DateTime

    licenceNum: String!
    licenceImg: Int!
    verificationStatus: VerificationStatus
    experience: Int
    about: String
    educational: String
    rating: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "doctor" query returns an array of zero or more doctor (defined above).

  extend type Query {
    getDoctor(uid: UUID): [Doctor]
  }

  extend type Mutation {
    createDoctor(
      firstName: String!
      MiddleName: String
      lastName: String!
      email: EmailAddress!
      password: Password!
      role: Role!
      createdAt: DateTime
      updatedAt: DateTime

      licenceNum: String!
      licenceImg: Int!
      verificationStatus: VerificationStatus
      experience: Int
      about: String
      educational: String
      rating: Int
    ): Doctor

    updateDoctor(
      uid:UUID!
      firstName: String
      MiddleName: String
      lastName: String
      email: EmailAddress
      password: Password
      role: Role
      createdAt: DateTime
      updatedAt: DateTime

      licenceNum: String
      licenceImg: Int
      verificationStatus: VerificationStatus
      experience: Int
      about: String
      educational: String
      rating: Int
    ): Doctor

    deleteDoctor(uid: UUID!): Doctor
  }

  # type Subcription {

  # }
`;

export default doctor;
