import { gql } from "apollo-server-core";
const doctor = gql`
  type Doctor implements User {
    uid: UUID!
    firstName: String!
    middleName: String
    lastName: String!
    email: EmailAddress!
    password: String!
    birthdate: Date!
    sex: Sex
    address: Address
    role: Role!
    img: String
    createdAt: DateTime
    updatedAt: DateTime
    pushToken: String
    clinic: [Clinic]

    licenceNum: String!
    licenceImg: String!
    licenceExp: Date!
    specialization: [String!]
    verificationStatus: VerificationStatus
    experience: Int
    about: String
    educational: String
    rating: Int
  }

  type VerificationMessage {
    message: String
    status: VerificationStatus
  }

  input DoctorInput {
    licenceNum: String!
    licenceImg: String!
    licenceExp: Date!
    specialization: [String!]
    verificationStatus: VerificationStatus
    experience: Int
    about: String
    educational: String
    rating: Int
  }

  extend type Query {
    getDoctor: Doctor!
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
      uid: UUID
      licenceNum: String
      licenceImg: String
      licenceExp: Date
      verificationStatus: VerificationStatus
      experience: Int
      about: String
      educational: String
      rating: Int
      specialization: [String]
    ): Doctor
    deleteDoctor: Doctor
    doctorVerification(
      doctorUid: UUID!
      status: VerificationStatus!
      message: String
    ): VerificationMessage
  }

  extend type Subscription {
    doctorVerification(uid: UUID!): VerificationMessage
  }
`;

export default doctor;
