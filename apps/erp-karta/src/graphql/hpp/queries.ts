import { gql } from '@apollo/client'

export const INPUTHPP = gql`
  input GetAllHppInput {
    hppTypeId: Int!
    limit: Int!
    page: Int!
  }
`

export const TYPEHPP = gql`
  type HppTypes {
    id: Int!
    title: String!
  }

  type Hpp {
    id: Int!
    title: String!
    area: Int!
    pricePrintHead: Int
    priceInk: Int
    priceRoll: Int
    priceCutter: Int
    unitInk: String
    hpp: Int!
    HPPType: HppTypes
    components: [Component]
  }

  type HppList {
    data: [Hpp]
    isFirstPage: Boolean!
    isLastPage: Int!
    currentPage: Int!
    previousPage: Int
    nextPage: Int
    pageCount: Int!
    totalCount: Int!
  }
`

export const GETHPPTYPES = gql`
  query GetHppTypes {
    getHppTypes {
      id
      title
    }
  }
`

export const GETALLHPP = gql`
  query GetAllHpp($input: GetAllHppInput!) {
    getListHPP(getAllHppInput: $input) {
      data {
        id
        title
        hpp
        area
        pricePrintHead
        priceInk
        priceRoll
        priceCutter
        unitInk
        components {
          id
          title
          componentType {
            id
            title
          }
        }
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

export const GETHPP = gql`
  query GetHpp($id: Int!) {
    getHPP(id: $id) {
      id
      title
      hpp
      area
      pricePrintHead
      priceInk
      priceRoll
      priceCutter
      unitInk
      components {
        id
        title
        componentType {
          id
          title
        }
      }
    }
  }
`
