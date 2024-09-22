import { gql } from '@apollo/client'

export const TYPEGOODS = gql`
  type Goods {
    id: Int!
    title: String!
  }
`

export const GETGOODSTYPES = gql`
  query GetGoodsTypes {
    getGoodsTypes {
      id
      title
    }
  }
`

export const GETALLGOODS = gql`
  query GetAllGoods($goodsTypeId: Int!) {
    getAllGoods(goodsTypeId: $goodsTypeId) {
      id
      title
    }
  }
`

export const GETGOODS = gql`
  query GetGoods($id: Int!) {
    getGoods(id: $id) {
      id
      title
    }
  }
`
