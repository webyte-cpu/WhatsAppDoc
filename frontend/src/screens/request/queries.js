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
        address{
          address
          city
          province
        }
        doctor{
          uid
          firstName
          lastName
        }
      }
      patient{
        uid
        firstName
        lastName
      }
    }
  }
`