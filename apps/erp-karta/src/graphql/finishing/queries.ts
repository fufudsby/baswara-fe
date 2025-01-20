import { gql } from '@apollo/client'

export const INPUTFINSHING = gql`
  input GetFinishingsInput {
    finishingTypeId: Int!
    limit: Int!
    page: Int!
  }
`

export const TYPEFINISHING = gql`
  type Finishing {
    id: Int!
    title: String!
    priceDpp: Int!
    unit: Component
    description: String!
  }

  type Finishings {
    data: [Finishing]
    isFirstPage: Boolean!
    isLastPage: Int!
    currentPage: Int!
    previousPage: Int
    nextPage: Int
    pageCount: Int!
    totalCount: Int!
  }
`

export const GETFINISHINGTYPES = gql`
  query GetFinishingTypes {
    getFinishingTypes {
      id
      title
    }
  }
`

export const GETFINISHINGS = gql`
  query GetFinishings($input: GetFinishingsInput!) {
    getFinishings(getFinishingsInput: $input) {
      data {
        id
        title
        priceDpp
        description
        unit {
          title
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

export const GETFINISHING = gql`
  query GetFinishing($id: Int!) {
    finishing(id: $id) {
      id
      title
      description
    	priceDpp
    	area
    	unit {
        id
        title
      }
    	hpp {
        id
        title
        HPPType {
          id
          title
        }
      }
    }
  }
`
