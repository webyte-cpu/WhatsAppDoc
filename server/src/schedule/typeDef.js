import { gql } from "apollo-server-express";

const schedule = gql`
  type Schedule {
    uid: UUID!
    startTime: LocalTime!
    endTime: LocalTime!
    daysOfTheWeek: [Int!]
  }

  input SchedInput {
    startTime: LocalTime
    endTime: LocalTime
    daysOfTheWeek: [Int!]!
  }

  input SchedUpsertInput {
    uid: UUID
    startTime: LocalTime
    endTime: LocalTime
    daysOfTheWeek: [Int]
  }

  extend type Query {
    getSchedule(uid: UUID): Schedule
    getAllSchedule: [Schedule]
  }

  extend type Mutation {
    upsertSchedule(
      doctorClinicUid: UUID!
      schedList: [SchedUpsertInput!]
    ): [Schedule]
    createSchedule(doctorClinicUid: UUID!, schedList: [SchedInput!]): [Schedule]
    updateSchedule(
      uid: UUID!
      startTime: LocalTime
      endTime: LocalTime
      daysOfTheWeek: [Int]
    ): Schedule

    deleteSchedules(uids: [UUID!]): [Schedule]
  }
`;

export default schedule;
