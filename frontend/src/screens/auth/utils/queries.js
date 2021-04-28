import { gql } from "@apollo/client"

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $userEmail: EmailAddress!
    $userPassword: Password!
  ){
    login(
      email: $userEmail
      password: $userPassword
    )
    uid
  }

`

const SIGNUP_MUTATION = gql`
  mutation SignupMutation (
      $firstName: FirstName!
      $lastName: LastName!
      $email: EmailAddress!
      $password: Password!
      $role: Role!
  ){
      signUp(
          firstName: $firstName
          lastName: $lastName
          email: $email
          password: $password
          role: $role
          
      )
      uid
  }
`

export { LOGIN_MUTATION, SIGNUP_MUTATION }