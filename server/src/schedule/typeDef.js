import { gql } from "apollo-server-express";

const schedule = gql`
  type Schedule {
    uid: UUID!
    startTime: Time!
    endTime: Time!
    daysOfTheWeek: [Int!]
  }

  input SchedInput {
    doctorClinicUid: UUID!
    startTime: Time
    endTime: Time
    daysOfTheWeek: [Int!]
  }

  input SchedUpsertInput {
    uid:UUID
    doctorClinicUid: UUID
    startTime: Time
    endTime: Time
    daysOfTheWeek: [Int]
  }

  extend type Query {
    getSchedule(uid: UUID): [Schedule]
  }

  extend type Mutation {
    upsertSchedule(data: [SchedUpsertInput!]): [Schedule]
    createSchedule(data: [SchedInput!]): [Schedule]
    updateSchedule(
      uid: UUID!
      startTime: Time
      endTime: Time
      daysOfTheWeek: [Int]
    ): Schedule

    deleteSchedule(uid: UUID!): Schedule
  }
`;

export default schedule;
