import { gql } from '@apollo/client'

export const GETHPPTYPES = gql`
  query GetHppTypes {
    getHppTypes {
      id
      title
    }
  }
`