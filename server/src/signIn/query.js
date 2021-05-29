import { gql } from "apollo-server-express";

export const SIGN_IN = gql`
  mutation SignIn($email: EmailAddress!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;
