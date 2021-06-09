import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
mutation updateUser($uid:UUID!, $pushToken: String ){
  updateUser(uid: $uid , pushToken: $pushToken){
      uid
      pushToken
  }
}
`