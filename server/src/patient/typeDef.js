import { gql } from "apollo-server-core";
const patient = gql`
  type Patient implements User {
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
    appointment: Appointment

    contactNumber: PhoneNumber
    weight: PositiveFloat
    height: PositiveFloat
    civilStatus: CivilStatus
    nationality: String
  }

  extend type Query {
    getPatient: Patient
    getAllPatients: [Patient]
  }

  extend type Mutation {
    createPatient(
      contactNumber: PhoneNumber
      weight: PositiveFloat
      height: PositiveFloat
      civilStatus: CivilStatus
      nationality: String
    ): Patient

    updatePatient(
      uid: UUID!
      contactNumber: PhoneNumber
      weight: PositiveFloat
      height: PositiveFloat
      civilStatus: CivilStatus
      nationality: String
    ): Patient

    deletePatient(uid: UUID): UUID!
  }

  # type Subcription {

  # }
`;

export default patient;
