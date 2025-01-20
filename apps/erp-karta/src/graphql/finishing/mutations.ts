import { gql } from '@apollo/client'

export const INPUTUPDATEFINISHING = gql`
  input CreateFinishingInput {
    title: String!
    area: Int!
    priceDpp: Int!
    finishingTypeId: Int!
    description: String!
    unitId: Int!
    log: String!
    hppIds: [Int]!
  }

  input UpdateFinishingInput {
    id: Int!
    title: String!
    area: Int!
    priceDpp: Int!
    finishingTypeId: Int!
    description: String!
    unitId: Int!
    log: String!
    hppIds: [Int]!
  }
`

export const CREATEFINISHING = gql`
  mutation CreateFinishing($input: CreateFinishingInput!) {
    createFinishing(createFinishingInput: $input) {
      id
    }
  }
`

export const UPDATEFINISHING = gql`
  mutation UpdateFinishing($input: UpdateFinishingInput!) {
    updateFinishing(updateFinishingInput: $input) {
      id
    }
  }
`

export const DELETEFINISHING = gql`
  mutation DeleteFinishing($id: Int!) {
    removeFinishing(id: $id) {
      title
    }
  }
`