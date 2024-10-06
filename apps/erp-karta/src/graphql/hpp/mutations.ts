import { gql } from '@apollo/client'

export const INPUTUPDATEHPP = gql`
  input CreateHppInput {
    title: String!
    area: Int!
    hpp: Int!
    hppTypeId: Int!
    pricePrintHead: Int!
    priceRoll: Int!
    priceCutter: Int!
    priceInk: Int!
    unitInk: String!
    componentIds: [Int]!
  }

  input UpdateHppInput {
    id: Int!
    title: String!
    area: Int!
    hpp: Int!
    hppTypeId: Int!
    pricePrintHead: Int!
    priceRoll: Int!
    priceCutter: Int!
    priceInk: Int!
    unitInk: String!
    componentIds: [Int]!
  }
`

export const CREATEHPP = gql`
  mutation CreateHpp($input: CreateHppInput!) {
    createHpp(createHppInput: $input) {
      id
    }
  }
`

export const UPDATEHPP = gql`
  mutation UpdateHpp($input: UpdateHppInput!) {
    updateHpp(updateHppInput: $input) {
      id
    }
  }
`

export const DELETEHPP = gql`
  mutation DeleteHpp($id: Int!) {
    removeHpp(id: $id) {
      title
    }
  }
`