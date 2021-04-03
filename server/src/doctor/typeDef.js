import { gql } from "apollo-server-core";
const doctor = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  enum VerificationStatus {
    PENDING
    VERIFIED
    DECLINED
  }

  # This "doctor" type defines the queryable fields for every doctor in our data source.
  type Doctor implements User {
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

    licenceNo: String!
    experience: Int!
    rating: Int
    doctor_verification_status: VerificationStatus
    about: String
    bio: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "doctor" query returns an array of zero or more doctor (defined above).

  extend type Query {
    getDoctor(uid: UUID): [Doctor]
  }

  extend type Mutation {
    createDoctor(
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
      isDoctor: Boolean
      licenceNo: String!
      experience: Int!
      rating: Int
      verificationStatus: VerificationStatus
      about: String
      bio: String
    ): Doctor

    updateDoctor(
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
      isDoctor: Boolean
      licenceNo: String!
      experience: Int!
      rating: Int
      verificationStatus: VerificationStatus
      about: String
      bio: String
    ): Doctor

    deleteDoctor(uid: UUID!): Doctor
  }

  # type Subcription {

  # }
`;

export default doctor;
