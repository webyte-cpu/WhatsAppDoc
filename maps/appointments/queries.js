import { gql } from '@apollo/client';


export const UPDATE_APPOINTMENT = gql`
  mutation updateAppointment($uid:UUID!, $status: Status){
  updateAppointment(uid: $uid, status: $status,){
    uid
    status
  }
}
`;

export const GET_APPOINTMENTS = gql`
query{
 getAppointment{
  uid
  patientUid
  doctorClinicUid
  status
  doctorRemarks
  dateTime
  createdAt
  updatedAt
}
}
`