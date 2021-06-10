import { gql } from "apollo-server-express";

export const GET_USER = gql`
  query GetUser {
    getUser {
      firstName
      lastName
      email
      uid
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String
    $middleName: String
    $lastName: String
    $password: String
    $role: Role
    $sex: Sex
    $birthdate: Date
    $img: String
  ) {
    updateUser(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      password: $password
      role: $role
      sex: $sex
      birthdate: $birthdate
      img: $img
    ) {
      uid
      firstName
      middleName
      lastName
    }
  }
`;
