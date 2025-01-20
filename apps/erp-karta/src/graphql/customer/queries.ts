import { gql } from '@apollo/client'

export const INPUTCUSTOMER = gql`
  input GetCustomersInput {
    limit: Int!
    page: Int!
    search: String
  }
`

export const TYPECUSTOMER = gql`
  type Customer {
    id: Int!
    name: String!
    phone: String
    address: String
  }

  type Customers {
    data: [Customer]
    isFirstPage: Boolean!
    isLastPage: Int!
    currentPage: Int!
    previousPage: Int
    nextPage: Int
    pageCount: Int!
    totalCount: Int!
  }
`

export const GETCUSTOMERS = gql`
  query GetCustomers($input: GetCustomersInput!) {
    getCustomers(getCustomersInput: $input) {
      data {
        id
        name
        address
        phone
      }
      totalCount
      currentPage
      isFirstPage
      isLastPage
      nextPage
      previousPage
      pageCount
    }
  }
`

export const GETCUSTOMER = gql`
  query GetCustomer($id: Int!) {
    getCustomer(id: $id) {
      id
      name
      phone
      address
    }
  }
`
