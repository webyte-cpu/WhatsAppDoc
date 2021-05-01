import { gql } from '@apollo/client';

export const SIGNIN_MUTATION = gql`
  mutation SignIn($email: EmailAddress!, $password: Password!) {
    signIn(email: $email, password: $password)
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignUp(
    $firstName: String!
    $middleName: String
    $lastName: String!
    $email: EmailAddress!
    $password: Password!
    $role: Role!
    $sex: Sex!
    $birthdate: Date!
    $doctor: DoctorInput
  ) {
    signUp(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      email: $email
      password: $password
      role: $role
      sex: $sex
      birthdate: $birthdate
      doctor: $doctor
    )
  }
`;

export const GET_USER = gql`
    query getUser {
      getUser {
        firstName
        middleName
        lastName
        role
        ... on Doctor {
          verificationStatus
        }
      }
    }
  `;