import { gql } from '@apollo/client'

export const INPUTUPDATEORDERDESIGN = gql`
  input CreateOrderDesignDetailInput {
    id: Int!
    unitId: Int!
    productId: Int!
    length: Int
    width: Int
    quantity: Int!
    folderName: String
    fileName: String
    description: String
    start: String!
    end: String!
    finishingIds: [Int]!
  }

  input CreateOrderDesignInput {
    customerId: Int!
    orderFrom: String
    data: [CreateOrderDesignDetailInput]!
  }

  input UpdateOrderDesignInput {
    id: Int!
    customerId: Int!
    orderFrom: String
    data: [CreateOrderDesignDetailInput]!
  }
`

export const CREATEORDERDESIGN = gql`
  mutation CreateOrderDesign($input: CreateOrderDesignInput!) {
    createOrderDesign(createOrderDesignInput: $input) {
      id
    }
  }
`

export const UPDATEORDERDESIGN = gql`
  mutation UpdateOrderDesign($input: UpdateOrderDesignInput!) {
    updateOrderDesign(updateOrderDesignInput: $input) {
      id
    }
  }
`

export const DELETEORDERDESIGN = gql`
  mutation DeleteOrderDesign($id: Int!) {
    removeOrderDesign(id: $id) {
      name
    }
  }
`