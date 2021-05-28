import { gql } from "apollo-server-core";

export default gql`
  type Appointment {
    uid: UUID
    patientUid: UUID
    doctorClinicUid: UUID
    status: Status
    dateTime: DateTime
    doctorRemarks: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type Query {
    getAppointment(uid: UUID): Appointment
    getAllAppointment: [Appointment]
  }

  extend type Mutation {
    createAppointment(doctorClinicUid: UUID, dateTime: DateTime): Appointment
    updateAppointment(
      uid: UUID
      status: Status
      dateTime: DateTime
      doctorRemarks: String
    ): Appointment
    deleteAppointment(uid: UUID): Appointment
  }
`;
