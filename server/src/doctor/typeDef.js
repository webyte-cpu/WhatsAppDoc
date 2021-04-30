import { gql } from "apollo-server-core";
const doctor = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "doctor" type defines the queryable fields for every doctor in our data source.
  type Doctor implements User {
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

    licenceNum: String!
    licenceImg: String!
    licenceExp: Date!
    specialization: [String]
    verificationStatus: VerificationStatus
    experience: Int
    about: String
    educational: String
    rating: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "doctor" query returns an array of zero or more doctor (defined above).

  input DoctorInput {
    licenceNum: String!
    licenceImg: String!
    licenceExp: Date!
    specialization: [String]
    verificationStatus: VerificationStatus
    experience: Int
    about: String
    educational: String
    rating: Int
  }

  extend type Query {
    getDoctor(uid: UUID): [Doctor]
    getAllDoctor: [Doctor]
  }

  extend type Mutation {
    createDoctor(
      licenceNum: String!
      licenceImg: String!
      licenceExp: Date!
      verificationStatus: VerificationStatus
      experience: Int
      about: String
      educational: String
      rating: Int
    ): Doctor

    updateDoctor(
      uid: UUID!
      licenceNum: String
      licenceImg: String
      licenceExp: Date
      verificationStatus: VerificationStatus
      experience: Int
      about: String
      educational: String
      rating: Int
    ): Doctor

    deleteDoctor(uid: UUID!): UUID!
  }

  # type Subcription {

  # }
`;

export default doctor;
