import { gql } from 'apollo-server-express';

export const GET_SCHEDULE = gql`
  query GetSchedule($uid: UUID!){
    getSchedule(uid: $uid) {
      uid
      startTime
      endTime
      daysOfTheWeek
    }
  }
`

export const UPSERT_SCHEDULE = gql`
  mutation UpsertSchedule($data: [SchedUpsertInput!]) {
    upsertSchedule(data: $data) {
      uid
      startTime
      endTime
      daysOfTheWeek
    }
  }
`

export const CREATE_SCHEDULE = gql`
  mutation CreateSchedule($data: [SchedInput!]) {
    createSchedule(data: $data) {
      uid
      startTime
      endTime
      daysOfTheWeek
    }
  }
`

export const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule(
    $uid: UUID!
    $startTime: LocalTime
    $endTime: LocalTime
    $daysOfTheWeek: [Int]
  ) {
    updateSchedule(
      uid: $uid,
      startTime: $startTime,
      endTime: $endTime,
      daysOfTheWeek: $daysOfTheWeek 
    ) {
      uid
      startTime
      endTime
      daysOfTheWeek
    }
  }
`

export const DELETE_SCHEDULE = gql`
  mutation DeleteSchedule($uid: UUID!){
    deleteSchedule(uid: $uid) {
      uid
      startTime
      endTime
      daysOfTheWeek
    }
  }
`
