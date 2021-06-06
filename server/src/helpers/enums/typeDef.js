import { gql } from "apollo-server-express";

const enums = gql`
  enum Role {
    ADMIN
    DOCTOR
    PATIENT
  }

  enum Sex {
    MALE
    FEMALE
  }

  enum CivilStatus {
    SINGLE
    MARRIED
    DIVORCED
    WIDOWED
  }

  enum Status {
    PENDING
    IN_QUEUE
    ON_GOING
    DONE
    CANCELLED
  }

  enum MedicalType {
    ALLERGIES
    SURGICAL
    IMMUNIZATION
    LABRATORY
    GENERAL
    OTHER
  }

  enum VerificationStatus {
    PENDING
    VERIFIED
    UNVERIFIED
    DECLINED
  }

  enum DayOfTheWeek {
    SUNDAY
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
  }
`;

export default enums;
