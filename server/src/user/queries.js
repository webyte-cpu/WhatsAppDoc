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
<<<<<<< Updated upstream
=======
    $sex: Sex!
    $birthdate: Date!
>>>>>>> Stashed changes
  ) {
    signUp(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      email: $email
      password: $password
      role: $role
<<<<<<< Updated upstream
=======
      sex: $sex
      birthdate: $birthdate
>>>>>>> Stashed changes
    )
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
<<<<<<< Updated upstream
    $firstName: String!
    $middleName: String
    $lastName: String!
    $password: Password!
    $role: Role!
  ) {
    updateUser(
=======
    $uid: UUID!
    $firstName: String
    $middleName: String
    $lastName: String
    $password: Password
    $role: Role
    $sex: Sex
    $birthdate: Date
    $img: String
  ) {
    updateUser(
      uid: $uid
>>>>>>> Stashed changes
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      password: $password
      role: $role
<<<<<<< Updated upstream
    )
=======
      sex: $sex
      birthdate: $birthdate
      img: $img
    ) {
      uid
      firstName
      middleName
      lastName
    }
>>>>>>> Stashed changes
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($uid: UUID!) {
<<<<<<< Updated upstream
    deleteUser(uid: $uid)
=======
    deleteUser(uid: $uid) {
      uid
      firstName
      middleName
      lastName
    }
>>>>>>> Stashed changes
  }
`;
