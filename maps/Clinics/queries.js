import { gql } from '@apollo/client';

export const GET_CLINICS = gql`
query{
  getAllClinic{
    name
    doctor{
      firstName
    }
    
    address{
      coordinates
    }
  }
}
`