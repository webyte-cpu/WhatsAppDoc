import { gql } from 'apollo-server-express';

export const GET_APPOINTMENT = gql`
  query GetAppointment($uid: UUID!) {
    getAppointment(uid: $uid) {
      uid
      patientUid
      doctorClinicUid
      status
      dateTime
      doctorRemarks
      createdAt
      updatedAt
    }
  }
`
export const GET_ALL_APPOINTMENT = gql`
  query GetAllAppointment {
    getAllAppointment {
      uid
      patientUid
      doctorClinicUid
      status
      dateTime
      doctorRemarks
      createdAt
      updatedAt
    }
  }
`

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $doctorClinicUid: UUID,
    $dateTime: DateTime
  ){
    createAppointment(
      doctorClinicUid: $doctorClinicUid,
      dateTime: $dateTime
    ) {
      uid
      patientUid
      doctorClinicUid
      status
      dateTime
      doctorRemarks
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment(
    $uid: UUID
    $status: Status
    $dateTime: DateTime
    $doctorRemarks: String
  ){
    updateAppointment(
      uid: $uid
      status: $status
      dateTime: $dateTime
      doctorRemarks: $doctorRemarks
    ) {
      uid
      patientUid
      doctorClinicUid
      status
      dateTime
      doctorRemarks
    }
  }
`