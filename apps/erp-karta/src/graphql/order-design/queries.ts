import { gql } from '@apollo/client'

export const INPUTORDERDESIGN = gql`
  input GetListOrderDesignInput {
    limit: Int!
    page: Int!
    startDate: String!
    endDate: String!
  }
`

export const TYPEORDERDESIGN = gql`
  type OrderDesignDetailFinishing {
    id: Int!
    title: String!
  }
  type OrderDesignDetailProduct {
    id: Int!
    title: String!
    priceDpp: Int!
  }
  type OrderDesignDetail {
    id: Int!
    start: String!
    end: String!
    description: String
    fileName: String
    folderName: String
    length: Int
    width: Int
    unitId: Int
    quantity: Int!
    product: OrderDesignDetailProduct!
    finishing: [OrderDesignDetailFinishing]
  }
  type OrderDesign {
    id: Int!
    status: Int!
    statusPaid: Boolean!
    orderFrom: String
    customer: Customer!
    operatorDesign: User
    cashier: User
    orderId: Int!
    orderDesignDetail: [OrderDesignDetail]
  }

  type OrderDesignList {
    data: [OrderDesign]
    isFirstPage: Boolean!
    isLastPage: Int!
    currentPage: Int!
    previousPage: Int
    nextPage: Int
    pageCount: Int!
    totalCount: Int!
    process: Int!
    printing: Int!
    done: Int!
  }
`

export const GETLISTORDERDESIGN = gql`
  query GetListOrderDesign($input: GetListOrderDesignInput!) {
    getListOrderDesign(getListOrderDesignInput: $input) {
      data {
        id
        statusPaid
        status
        orderFrom
        customer {
          name
        }
        operatorDesign {
          username
        }
        cashier {
          username
        }
        orderId
        orderDesignDetail {
          id
          start
          end
          description
          fileName
          folderName
          length
          width
          unitId
          quantity
          product {
            priceDpp
          }
          finishing {
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
      process
      printing
      done
    }
  }
`

export const GETORDERDESIGN = gql`
  query GetOrderDesign($id: Int!) {
    orderDesign(id: $id) {
      id
      orderId
      status
      statusPaid
      orderFrom
      customer {
        id
      }
      orderDesignDetail {
        id
        start
        end
        description
        fileName
        folderName
        length
        width
        unitId
        quantity
        product {
          id
          priceDpp
        }
        finishing {
          id
        }
      }
    }
  }
`
