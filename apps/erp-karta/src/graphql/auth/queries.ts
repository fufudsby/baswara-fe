import { gql } from '@apollo/client'

export const GETCURRENTUSER = gql`
  {
    getCurrentUser {
    id
    email
    username
  }
  }
`