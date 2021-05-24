import { gql } from "apollo-server-express";

export const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!
    $middleName: String
    $lastName: String!
    $email: EmailAddress!
    $password: String!
    $role: Role!
    $img: String
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
      img: $img
      sex: $sex
      birthdate: $birthdate
      doctor: $doctor
    )
  }
`;
