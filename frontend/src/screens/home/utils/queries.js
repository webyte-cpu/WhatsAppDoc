import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
mutation updateUser($pushToken: String ){
  updateUser(pushToken: $pushToken){
      pushToken
  }
}
`