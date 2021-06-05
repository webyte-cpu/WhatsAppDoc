import { gql } from '@apollo/client';

export const GET_APPOINTMENT = gql`
query{
  getAllAppointment{
    uid	
    status
    dateTime
    updatedAt
    clinic{
      address{
        address
      }
      doctor{
            uid
            firstName
      }
    }
    patient{
        uid
        firstName
    }
  }
}
`;
