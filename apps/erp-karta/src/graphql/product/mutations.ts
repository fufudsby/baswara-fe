import { gql } from '@apollo/client'

export const INPUTUPDATEPRODUCT = gql`
  input CreateProductInput {
    title: String!
    area: Int!
    priceDpp: Int!
    productTypeId: Int!
    description: String!
    unitId: Int!
    log: String!
    hppIds: [Int]!
  }

  input UpdateProductInput {
    id: Int!
    title: String!
    area: Int!
    priceDpp: Int!
    productTypeId: Int!
    description: String!
    unitId: Int!
    log: String!
    hppIds: [Int]!
  }
`

export const CREATEPRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
      id
    }
  }
`

export const UPDATEPRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(updateProductInput: $input) {
      id
    }
  }
`

export const DELETEPRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    removeProduct(id: $id) {
      title
    }
  }
`