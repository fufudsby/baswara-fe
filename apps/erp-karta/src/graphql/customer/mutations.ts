import { gql } from '@apollo/client'

export const INPUTUPDATECUSTOMER = gql`
  input CreateCustomerInput {
    name: String!
    phone: String
    address: String
  }

  input UpdateCustomerInput {
    id: Int!
    name: String!
    phone: String
    address: String
  }
`

export const CREATECUSTOMER = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $input) {
      id
    }
  }
`

export const UPDATECUSTOMER = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(updateCustomerInput: $input) {
      id
    }
  }
`

export const DELETECUSTOMER = gql`
  mutation DeleteCustomer($id: Int!) {
    removeCustomer(id: $id) {
      name
    }
  }
`