import { gql } from "@apollo/client";

export const GET_ALL_DOCTORS = gql`
  query getAllDoctor {
    results: getAllDoctor {
      uid
      verificationStatus
      firstName
      lastName
      middleName
      specialization
      clinic {
        uid
        doctorClinicUid
        name
        minimumSchedulingNoticeMins
        slotDurationInMins
        consultationFee
        address {
          coordinates
          address
          city
          province
          country
          zipCode
        }
        schedule {
          uid
          startTime
          endTime
          daysOfTheWeek
        }
      }
      about
      educational
      experience
      rating
    }
  }
`