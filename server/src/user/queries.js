import { gql } from "apollo-server-express";

export const GET_USER = gql`
  query GetUser($uid: UUID!) {
    getUser(uid: $uid) {
      firstName
      lastName
      email
      uid
      role
      updatedAt
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: EmailAddress!, $password: Password!) {
    signIn(email: $email, password: $password)
  }
`;

export const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!
    $middleName: String
    $lastName: String!
    $email: EmailAddress!
    $password: Password!
    $role: Role!
  ) {
    signUp(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      email: $email
      password: $password
      role: $role
    )
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String!
    $middleName: String
    $lastName: String!
    $password: Password!
    $role: Role!
  ) {
    updateUser(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      password: $password
      role: $role
    )
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($uid: UUID!) {
    deleteUser(uid: $uid)
  }
`;
