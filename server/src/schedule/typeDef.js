import { gql } from "apollo-server-express";

const schedule = gql`
  enum DaysOfTheWeek {
    SUNDAY
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
  }

  type Schedule {
    uid: UUID!
    startTime: Time!
    endTime: Time!
    daysOfTheWeek: [DaysOfTheWeek!]!
  }

  extend type Query {
    getSchedule(uid: UUID): [Schedule]
  }

  extend type Mutation {
    createSchedule(
      doctorClinicUid: UUID!
      startTime: Time
      endTime: Time
      daysOfTheWeek: [DaysOfTheWeek!]!
    ): Schedule

    updateSchedule(
      uid: UUID!
      startTime: Time
      endTime: Time
      daysOfTheWeek: [DaysOfTheWeek]
    ): Schedule

    deleteSchedule(uid: UUID!): Schedule
  }
`;

export default schedule;
