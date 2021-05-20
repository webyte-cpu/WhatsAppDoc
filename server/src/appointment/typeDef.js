import { gql } from "apollo-server-core";

export default gql`
  type Appointment {
    uid: UUID
    patientUid: UUID
    doctorClinicUid: UUID
    status: Status
    timestamp: DateTime
    doctorRemarks: String
  }

  extend type Query {
    getAppointment(uid: UUID): Appointment
  }

  extend type Mutation {
    createAppointment(
      patientUid: UUID
      doctorClinicUid: UUID
      status: Status
      timestamp: DateTime
      doctorRemarks: String
    ): Appointment

    updateAppointment(
      uid: UUID
      patientUid: UUID
      doctorClinicUid: UUID
      status: Status
      timestamp: DateTime
      doctorRemarks: String
    ): Appointment

    deleteAppointment(uid: UUID): Appointment
  }
`;
