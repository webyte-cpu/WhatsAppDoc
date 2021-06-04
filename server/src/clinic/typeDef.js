import { gql } from "apollo-server-core";
const clinic = gql`
  type Clinic {
    uid: UUID!
    doctorClinicUid: UUID
    name: String!
    roomNumber: String
    address: Address
    doctor: Doctor
    minimumSchedulingNoticeMins: Int
    slotDurationInMins: Int
    consultationFee: Int
    appointment: [Appointment]
    schedule: [Schedule]
  }

  extend type Query {
    getClinic(uid: UUID, doctorUid: UUID): [Clinic]
    getAllClinic: [Clinic]
  }

  extend type Mutation {
    upsertClinic(
      uid: UUID
      doctorClinicUid: UUID
      name: String!
      roomNumber: String
      address: AddressInput!
      minimumSchedulingNoticeMins: Int!
      slotDurationInMins: Int!
      consultationFee: Int
    ): Clinic

    createClinic(
      name: String!
      roomNumber: String
      address: AddressInput!
      minimumSchedulingNoticeMins: Int!
      slotDurationInMins: Int!
      consultationFee: Int
    ): Clinic

    updateClinic(
      uid: UUID!
      name: String
      roomNumber: String
      address: AddressInput
      minimumSchedulingNoticeMins: Int
      slotDurationInMins: Int
      consultationFee: Int
    ): Clinic

    deleteClinic(uid: UUID!): Clinic
  }

  # type Subcription {

  # }
`;

export default clinic;
