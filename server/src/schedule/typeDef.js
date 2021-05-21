import { gql } from "apollo-server-express";

const schedule = gql`
  type Schedule {
    uid: UUID!
    startTime: LocalTime!
    endTime: LocalTime!
    daysOfTheWeek: [Int!]
  }

  input SchedInput {
    doctorClinicUid: UUID!
    startTime: LocalTime
    endTime: LocalTime
    daysOfTheWeek: [Int!]
  }

  input SchedUpsertInput {
    uid:UUID
    doctorClinicUid: UUID!
    startTime: LocalTime
    endTime: LocalTime
    daysOfTheWeek: [Int]
  }

  extend type Query {
    getSchedule(uid: UUID, doctorClinicUid: UUID): [Schedule]
  }

  extend type Mutation {
    upsertSchedule(data: [SchedUpsertInput!]): [Schedule]
    createSchedule(data: [SchedInput!]): [Schedule]
    updateSchedule(
      uid: UUID!
      startTime: LocalTime
      endTime: LocalTime
      daysOfTheWeek: [Int]
    ): Schedule

    deleteSchedule(uid: UUID!): Schedule
  }
`;

export default schedule;
