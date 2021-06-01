import { gql } from '@apollo/client';

export const SAVE_CLINIC_MUTATION = gql`
  mutation upsertClinic(
    $doctorClinicUid:UUID
    $uid:UUID
    $name: String!
    $roomNumber: String!
    $address: AddressInput!
    $minimumSchedulingNoticeMins: Int!
    $slotDurationInMins: Int!
    $consultationFee: Int
  ) {
    result: upsertClinic (
      doctorClinicUid: $doctorClinicUid
      uid: $uid
      name: $name
      roomNumber: $roomNumber
      address: $address
      minimumSchedulingNoticeMins: $minimumSchedulingNoticeMins
      slotDurationInMins: $slotDurationInMins
      consultationFee: $consultationFee
    ) {
      uid
      doctorClinicUid
    }
  }
`

export const SAVE_SCHEDULE_MUTATION = gql`
  mutation upsertSchedule($doctorClinicUid: UUID!, 	$schedList: [SchedUpsertInput!]) {
    upsertSchedule(doctorClinicUid:$doctorClinicUid, schedList:$schedList) {
      uid
      startTime
      endTime
      daysOfTheWeek
    }
  }
`

export const GET_CLINICS = gql`
  query getClinic ($uid: UUID, $doctorUid: UUID) {
    getClinic (uid:$uid, doctorUid:$doctorUid) {
      doctorClinicUid
      uid
      roomNumber
      name
      consultationFee
      slotDurationInMins
      minimumSchedulingNoticeMins
      address {
        uid
        address
        city
        province
        country
        zipCode
        coordinates
      }
      ...on Clinic {
        schedule {
          uid
          startTime
          endTime
          daysOfTheWeek
        }
      }
    }
  }
`

export const DELETE_SCHEDULES = gql`
  mutation deleteSchedules($uids: [UUID!]) {
    deleteSchedules(uids: $uids) {
      uid
      startTime
      endTime
      daysOfTheWeek
    }
  }
`

export const DELETE_CLINIC = gql`
  mutation deleteClinic ($uid: UUID!) {
    deleteClinic (uid:$uid) {
      doctorClinicUid
      uid
      roomNumber
      name
      consultationFee
      slotDurationInMins
      minimumSchedulingNoticeMins
      address {
        uid
        address
        city
        province
        country
        zipCode
        coordinates
      }
      ...on Clinic {
        appointment {
          uid
        }
        schedule{
          uid
          startTime
          endTime
          daysOfTheWeek
        }
      }
    }
  }
`