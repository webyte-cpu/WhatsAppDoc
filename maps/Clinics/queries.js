import { gql } from '@apollo/client';

export const GET_DOCTORS = gql`
  query {
    getDoctor{
      uid
      firstName
      lastName
      licenceNum
      licenceExp
      verificationStatus
      specialization
    }
  }
`;

export const UPDATE_DOCTOR = gql`
  mutation updateDoctor($uid:UUID!, $verificationStatus: VerificationStatus ){
      updateDoctor(uid: $uid , verificationStatus: $verificationStatus){
          uid
      }
  }
`;

export const GET_CLINICS = gql`
    query{
        getClinic{
        name
        doctor{
        firstName
        lastName
        }
        address{
        address
        city
        coordinates
        }
    }
    }
`