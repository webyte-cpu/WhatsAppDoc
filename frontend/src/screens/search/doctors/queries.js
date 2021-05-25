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

