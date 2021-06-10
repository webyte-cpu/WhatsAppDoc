import { gql } from "apollo-server-express";

export const GET_SCHEDULE = gql`
  query getSchedule($uid: UUID!) {
    getSchedule(uid: $uid) {
      startTime
      endTime
      daysOfTheWeek
    }
  }
`;

export const UPSERT_SCHEDULE = gql`
  mutation upsertSched($doctorClinicUid: UUID!, $schedList: [SchedUpsertInput!]) {
    upsertSchedule(doctorClinicUid: $doctorClinicUid, schedList: $schedList) {
      startTime
      endTime
      daysOfTheWeek
    }
  }
`;

export const CREATE_SCHEDULE = gql`
  mutation createSched($doctorClinicUid: UUID!, $schedList: [SchedInput!]) {
    createSchedule(doctorClinicUid: $doctorClinicUid, schedList: $schedList) {
      startTime
      endTime
      daysOfTheWeek
    }
  }
`;

export const UPDATE_SCHEDULE = gql`
  mutation updateSchedule(
    $uid: UUID!
    $startTime: LocalTime
    $endTime: LocalTime
    $daysOfTheWeek: [Int]
  ) {
    updateSchedule(
      uid: $uid
      startTime: $startTime
      endTime: $endTime
      daysOfTheWeek: $daysOfTheWeek
    ) {
      startTime
      endTime
      daysOfTheWeek
    }
  }
`;

export const DELETE_SCHEDULE = gql`
  mutation deleteSchedules($uids: [UUID!]) {
    deleteSchedules(uids: $uids) {
      startTime
      endTime
      daysOfTheWeek
    }
  }
`;
