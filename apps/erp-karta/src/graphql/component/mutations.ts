import { gql } from '@apollo/client'

export const INPUTUPDATECOMPONENT = gql`
  input CreateComponentInput {
    componentTypeId: Int!
    title: String!
  }

  input UpdateComponentInput {
    id: Int!
    title: String!
  }
`

export const CREATECOMPONENT = gql`
  mutation CreateComponent($input: CreateComponentInput!) {
    createComponent(createComponentInput: $input) {
      id
    }
  }
`

export const UPDATECOMPONENT = gql`
  mutation UpdateComponent($input: UpdateComponentInput!) {
    updateComponent(updateComponentInput: $input) {
      id
    }
  }
`

export const DELETECOMPONENT = gql`
  mutation DeleteComponent($id: Int!) {
    removeComponent(id: $id) {
      title
    }
  }
`