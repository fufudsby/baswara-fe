import { gql } from '@apollo/client'

export const INPUTUPDATEGOODS = gql`
  input CreateGoodsInput {
    goodsTypeId: Int!
    title: String!
  }

  input UpdateGoodsInput {
    id: Int!
    title: String!
  }
`

export const CREATEGOODS = gql`
  mutation CreateGoods($input: CreateGoodsInput!) {
    createGoods(createGoodsInput: $input) {
      id
    }
  }
`

export const UPDATEGOODS = gql`
  mutation UpdateGoods($input: UpdateGoodsInput!) {
    updateGoods(updateGoodsInput: $input) {
      id
    }
  }
`

export const DELETEGOODS = gql`
  mutation DeleteGoods($id: Int!) {
    removeGoods(id: $id) {
      title
    }
  }
`