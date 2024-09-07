import { gql } from '@apollo/client'

export const SIGNIN = gql`
  mutation SignIn($input: SignInInput!) {
    signin(signInInput: $input) {
      accessToken
      user {
        id
        email
        username
        roleType
      }
    }
  }
`