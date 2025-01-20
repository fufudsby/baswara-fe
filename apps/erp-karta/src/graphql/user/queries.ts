import { gql } from '@apollo/client'

export const TYPEUSER = gql`
  type User {
    id: Int!
    username: String!
  }
`

export const GETUSER = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      id
      email
      username
    }
  }
`