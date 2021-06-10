import { gql } from '@apollo/client';


export const UPDATE_APPOINTMENT_MUTATION = gql`
mutation updateAppointment($uid: UUID, $status: Status){
    updateAppointment(uid: $uid, status: $status){
    uid
    status
    doctorRemarks
  }
}
`


export const GET_ALL_APPOINTMENT = gql`
  query{
    getAllAppointment{  
      uid	
      status
      dateTime
      updatedAt
      createdAt
      clinic{
        name
        minimumSchedulingNoticeMins
        address{
          address
          city
          province
        }
        doctor{
          uid
          firstName
          lastName
          pushToken 
        }
      }
      patient{
        uid
        firstName
        lastName
        pushToken
      }
    }
  }
`