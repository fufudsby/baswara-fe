import { gql } from '@apollo/client'

export const GETUSER = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      id
      email
      username
    }
  }
`