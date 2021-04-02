import { gql } from "apollo-server-core";
const patient = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "patient" type defines the queryable fields for every patient in our data source.
  type Patient implements User {
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

    patientStatus: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "patient" query returns an array of zero or more patient (defined above).

  extend type Query {
    getPatient: [Patient]
  }

  extend type Mutation {
    createPatient(
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

      patientStatus: String
    ): Patient

    updatePatient(
      uid: UUID!
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

      patientStatus: String
    ): Patient

    deletePatient(uid: UUID): Patient
  }

  # type Subcription {

  # }
`;

export default patient;
