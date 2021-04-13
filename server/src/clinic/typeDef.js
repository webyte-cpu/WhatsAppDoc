import { gql } from "apollo-server-core";
const clinic = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  enum VerificationStatus {
    PENDING
    VERIFIED
    DECLINED
  }

  # This "clinic" type defines the queryable fields for every clinic in our data source.
  type Clinic {
    uid: UUID!
    name: String!
    roomNumber: String
    address: [address]

    licence_no: String!
    experience: Int!
    rating: Int
    clinic_verification_status: VerificationStatus
    about: String
    bio: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "clinic" query returns an array of zero or more clinic (defined above).

  extend type Query {
    getClinic(uid: UUID): [Clinic]
  }

  extend type Mutation {
    createClinic(
      address: AddressInput
      firstName: String!
      lastName: String!
      email: EmailAddress!
      password: String!
      sex: Sex
      birthdate: Date
      phoneNumber: String
      weight: PositiveFloat
      height: PositiveFloat
      civilStatus: String
      nationality: String
      isClinic: Boolean
      licenceNo: String!
      experience: Int!
      rating: Int
      verificationStatus: VerificationStatus
      about: String
      bio: String
    ): Clinic

    updateClinic(
      address: AddressInput
      firstName: String!
      lastName: String!
      email: EmailAddress!
      password: String!
      sex: Sex
      birthdate: Date
      phoneNumber: String
      weight: PositiveFloat
      height: PositiveFloat
      civilStatus: String
      nationality: String
      isClinic: Boolean
      licenceNo: String!
      experience: Int!
      rating: Int
      verificationStatus: VerificationStatus
      about: String
      bio: String
    ): Clinic

    deleteClinic(uid: UUID!): Clinic
  }

  # type Subcription {

  # }
`;

export default clinic;
