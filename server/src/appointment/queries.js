import { gql } from 'apollo-server-express';

export const GET_APPOINTMENT = gql`
  query GetAppointment($uid: UUID!) {
    getAppointment(uid: $uid) {
      uid
      patientUid
      doctorClinicUid
      status
      timestamp
      doctorRemarks
    }
  }
`

export const CREATE_APPOINTMENT = gql`
  query CreateAppointment(
    $patientUid: UUID
    $doctorClinicUid: UUID
    $status: Status
    $timestamp: DateTime
    $doctorRemarks: String
  ){
    createAppointment(
      patientUid: $patientUid,
      doctorClinicUid: $doctorClinicUid,
      status: $status,
      timestamp: $timestamp,
      doctorRemarks: $doctorRemarks
    ) {
      uid
      patientUid
      doctorClinicUid
      status
      timestamp
      doctorRemarks
    }
  }
`

export const UPDATE_APPOINTMENT = gql`
  query UpdateAppointment(
    $uid: UUID
    $patientUid: UUID
    $doctorClinicUid: UUID
    $status: Status
    $timestamp: DateTime
    $doctorRemarks: String
  ){
    updateAppointment(
      uid: $uid,
      patientUid: $patientUid,
      doctorClinicUid: $doctorClinicUid,
      status: $status,
      timestamp: $timestamp,
      doctorRemarks: $doctorRemarks
    ) {
      uid
      patientUid
      doctorClinicUid
      status
      timestamp
      doctorRemarks
    }
  }
`

export const DELETE_APPOINTMENT = gql`
  query DeleteAppointment($uid: UUID){ 
    query deleteAppointment(uid: $uid){ 
      uid
      patientUid
      doctorClinicUid
      status
      timestamp
      doctorRemarks
    } 
  }
`