import { gql } from "@apollo/client"

const LOGIN_MUTATION = gql`
  mutation Login(
    $userEmail: EmailAddress!
    $userPassword: Password!
  ){
    sigIn(
      email: $userEmail
      password: $userPassword
    )
  }

`

const SIGNUP_MUTATION = gql`
  mutation Signup(
    $email: EmailAddress!
    $password: Password!
    $firstName: String!
    $lastName: String!
    $middleName: String
    $role: Role!
    $sex: Sex!
    $birthdate: Date!
  ){
    signUp(      
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      middleName: $middleName
      role: $role
      sex: $sex
      birthdate: $birthdate
    )
  }
`
const SIGNUP_DOCTOR = gql`
  mutation SignupDoc(
    $licenceNum: String!
    $licenceImg: String!
    $licenceExp: Date!
    $verificationStatus: VerificationStatus
    $experience: Int
    $about: String
    $educational: String
    $rating: Int
  ){
    createDoctor(
      licenceNum: $licenceNum
      licenceImg: $licenceImg
      licenceExp: $licenceExp
      verificationStatus:$verificationStatus
      experience: $experience
      about: $about
      educational: $educational
      rating: $rating
    ){
      licenceNum
    }
}
`




export { LOGIN_MUTATION, SIGNUP_MUTATION, SIGNUP_DOCTOR }