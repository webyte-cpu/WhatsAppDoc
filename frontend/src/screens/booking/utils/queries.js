import { gql } from '@apollo/client';

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment(
    $doctorClinicUid: UUID!
    $schedule: DateTime!
  ) {
    createAppointment(
      doctorClinicUid: $doctorClinicUid, 
      dateTime: $schedule) {
        uid
        doctorClinicUid
        status
        dateTime
        createdAt
        updatedAt
    }
  }
`